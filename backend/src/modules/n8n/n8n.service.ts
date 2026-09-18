import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class N8nService {
  private readonly logger = new Logger(N8nService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async notificarEvento(tipoEvento: string, payload: any): Promise<boolean> {
    const webhookUrl =
      this.configService.get<string>('N8N_WEBHOOK_URL') ||
      'http://localhost:5678/webhook/saae-eventos';
    const apiKey =
      this.configService.get<string>('N8N_API_KEY') ||
      'SAAE_N8N_SECRET_KEY_2026';

    const cuerpoMensaje = {
      evento: tipoEvento,
      timestamp: new Date().toISOString(),
      data: payload,
    };

    try {
      this.logger.log(`Enviando evento '${tipoEvento}' a n8n en ${webhookUrl}`);
      const respuesta = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': apiKey,
        },
        body: JSON.stringify(cuerpoMensaje),
      });

      if (!respuesta.ok) {
        this.logger.warn(`n8n respondió con estado HTTP ${respuesta.status}`);
        return false;
      }

      this.logger.log(`Evento '${tipoEvento}' entregado a n8n correctamente`);
      return true;
    } catch (error: any) {
      this.logger.error(
        `Error al conectar con el servidor n8n (${webhookUrl}): ${error.message}`,
      );
      return false;
    }
  }

  private async findUsuarioPorDatos(datos: any) {
    const { estudiante, correoEstudiante, correo, estudianteId } = datos || {};

    if (estudianteId) {
      return this.prisma.usuario.findUnique({
        where: { id: Number(estudianteId) },
      });
    }

    if (correoEstudiante || correo) {
      const email = correoEstudiante || correo;
      const usuario = await this.prisma.usuario
        .findUnique({ where: { correo: String(email) } })
        .catch(() => null);
      if (usuario) return usuario;
    }

    if (estudiante) {
      const nombreCompleto = String(estudiante).trim();
      if (!nombreCompleto || nombreCompleto === 'Sin datos disponibles')
        return null;

      const [nombres, ...apellidos] = nombreCompleto.split(' ');
      const apellido = apellidos.join(' ') || '';

      return this.prisma.usuario.findFirst({
        where: {
          nombres: { equals: nombres, mode: 'insensitive' },
          apellidos: { equals: apellido, mode: 'insensitive' },
        },
      });
    }

    return null;
  }

  private async findCursoPorDatos(datos: any) {
    const valores = [
      datos?.cursoParalelo,
      datos?.curso,
      datos?.paralelo,
      datos?.materia,
      datos?.asignatura,
    ].filter(Boolean);

    for (const valor of valores) {
      const nombre = String(valor).trim();
      if (!nombre || nombre === 'Sin datos disponibles') continue;

      const curso = await this.prisma.curso.findFirst({
        where: {
          OR: [
            { nombre: { equals: nombre, mode: 'insensitive' } },
            { materia: { nombre: { equals: nombre, mode: 'insensitive' } } },
          ],
        },
        include: { materia: true },
      });

      if (curso) return curso;
    }

    return null;
  }

  private async registrarAlertaAsistencia(datos: any) {
    const payload = datos || {};
    const estudiante = await this.findUsuarioPorDatos(payload);
    const curso = await this.findCursoPorDatos(payload);

    if (!estudiante || !curso) {
      this.logger.warn(
        `No se pudo registrar la alerta de asistencia por falta de datos válidos: ${JSON.stringify(payload)}`,
      );
      return {
        exito: true,
        registrado: false,
        mensaje:
          'Alerta recibida pero no se pudo asociar con estudiante o curso disponible.',
        datosRecibidos: payload,
      };
    }

    const fechaValor =
      payload.fecha || payload.fechaRegistro || new Date().toISOString();
    const estado = String(payload.estado || 'FALTA').toUpperCase();

    const asistencia = await this.prisma.asistencia.create({
      data: {
        estudianteId: estudiante.id,
        cursoId: curso.id,
        fecha: new Date(fechaValor),
        estado:
          estado === 'PRESENTE'
            ? 'PRESENTE'
            : estado === 'ATRASO'
              ? 'ATRASO'
              : 'FALTA',
        observacion:
          payload.motivo || payload.tipoAlerta || 'Registro desde n8n',
        registradoPor: 'n8n',
      },
    });

    return {
      exito: true,
      registrado: true,
      mensaje: 'Alerta de asistencia registrada en el backend SAAE',
      asistenciaId: asistencia.id,
      datosRecibidos: payload,
    };
  }

  private async registrarJustificacion(datos: any) {
    const payload = datos || {};
    const estudiante = await this.findUsuarioPorDatos(payload);
    const curso = await this.findCursoPorDatos(payload);
    const fechaJustificacion =
      payload.fechaJustificacion ||
      payload.fechaSolicitud ||
      payload.fecha ||
      new Date().toISOString();

    if (!estudiante || !curso) {
      this.logger.warn(
        `No se pudo registrar la justificación por falta de datos válidos: ${JSON.stringify(payload)}`,
      );
      return {
        exito: true,
        registrado: false,
        mensaje:
          'Justificación recibida pero no se pudo asociar con estudiante o curso disponible.',
        datosRecibidos: payload,
      };
    }

    const asistencias = await this.prisma.asistencia.findMany({
      where: {
        estudianteId: estudiante.id,
        cursoId: curso.id,
        fecha: new Date(fechaJustificacion),
      },
      orderBy: { id: 'desc' },
      take: 1,
    });

    const asistenciaId = asistencias[0]?.id ?? null;
    const estado = String(payload.estado || 'PENDIENTE').toUpperCase();

    const justificacion = await this.prisma.justificacion
      .create({
        data: {
          estudianteId: estudiante.id,
          asistenciaId: asistenciaId ?? 1,
          motivo: payload.motivo || 'Sin motivo informado',
          estado:
            estado === 'APROBADO'
              ? 'APROBADO'
              : estado === 'RECHAZADO'
                ? 'RECHAZADO'
                : 'PENDIENTE',
          observacionDocente:
            payload.observaciones || payload.observacion || null,
          fechaSolicitud: new Date(fechaJustificacion),
        },
      })
      .catch(async () => {
        if (asistenciaId === null) {
          return null;
        }
        return this.prisma.justificacion.create({
          data: {
            estudianteId: estudiante.id,
            asistenciaId: asistenciaId,
            motivo: payload.motivo || 'Sin motivo informado',
            estado:
              estado === 'APROBADO'
                ? 'APROBADO'
                : estado === 'RECHAZADO'
                  ? 'RECHAZADO'
                  : 'PENDIENTE',
            observacionDocente:
              payload.observaciones || payload.observacion || null,
            fechaSolicitud: new Date(fechaJustificacion),
          },
        });
      });

    if (!justificacion) {
      return {
        exito: true,
        registrado: false,
        mensaje:
          'Justificación recibida, pero no fue posible vincularla a una asistencia existente.',
        datosRecibidos: payload,
      };
    }

    return {
      exito: true,
      registrado: true,
      mensaje: 'Justificación registrada en el backend SAAE',
      justificacionId: justificacion.id,
      datosRecibidos: payload,
    };
  }

  async procesarAccionEntrante(body: any) {
    const payload = body || {};
    const accion = payload.accion || payload.evento || 'DESCONOCIDA';

    this.logger.log(`Acción recibida desde n8n: ${accion}`);

    try {
      switch (accion) {
        case 'REGISTRAR_ALERTA_ASISTENCIA':
          return await this.registrarAlertaAsistencia(
            payload.datos || payload.data || payload,
          );
        case 'REGISTRAR_JUSTIFICACION':
          return await this.registrarJustificacion(
            payload.datos || payload.data || payload,
          );
        case 'CONFIRMAR_NOTIFICACION_ENVIADA':
        case 'NOTIFICAR_DOCENTE_JUSTIFICACION':
        case 'ENVIAR_INFORME_ANALITICA':
          return {
            exito: true,
            mensaje: 'Acción recibida y confirmada por el backend SAAE',
            accion,
            procesadoEn: new Date().toISOString(),
            datosRecibidos: payload,
          };
        default:
          return {
            exito: true,
            mensaje:
              'Acción recibida por el backend SAAE sin operación específica asociada.',
            accion,
            procesadoEn: new Date().toISOString(),
            datosRecibidos: payload,
          };
      }
    } catch (error: any) {
      this.logger.error(
        `Error al procesar acción '${accion}' en n8n: ${error.message}`,
      );
      return {
        exito: false,
        mensaje:
          'Error interno en el backend, pero el flujo de n8n no fue detenido.',
        accion,
        error: error.message,
      };
    }
  }
}
