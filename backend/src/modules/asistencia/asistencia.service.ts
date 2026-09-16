import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { N8nService } from '../n8n/n8n.service';
import { EstadoAsistencia } from '@prisma/client';

@Injectable()
export class AsistenciaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly n8nService: N8nService,
  ) {}

  async obtenerTodas(filtros?: { estudianteId?: number; cursoId?: number; fecha?: string }) {
    const where: any = {};
    if (filtros?.estudianteId) where.estudianteId = Number(filtros.estudianteId);
    if (filtros?.cursoId) where.cursoId = Number(filtros.cursoId);
    if (filtros?.fecha) where.fecha = new Date(filtros.fecha);

    const asistencias = await this.prisma.asistencia.findMany({
      where,
      include: {
        estudiante: {
          select: { id: true, nombres: true, apellidos: true, cedula: true, correo: true },
        },
        curso: {
          include: {
            materia: true,
            docente: { select: { nombres: true, apellidos: true } },
          },
        },
      },
      orderBy: { fecha: 'desc' },
    });

    return asistencias.map((a) => ({
      id: a.id,
      estudianteId: a.estudianteId,
      estudianteNombre: `${a.estudiante.nombres} ${a.estudiante.apellidos}`,
      asignatura: a.curso.materia.nombre,
      paralelo: a.curso.nombre,
      docente: `${a.curso.docente.nombres} ${a.curso.docente.apellidos}`,
      fecha: a.fecha.toISOString().split('T')[0],
      estado: a.estado === 'PRESENTE' ? 'P' : a.estado === 'ATRASO' ? 'A' : 'F',
      observacion: a.observacion ?? '',
      registradoPor: a.registradoPor ?? '',
      fechaRegistro: a.fechaRegistro.toISOString(),
    }));
  }

  async guardar(data: {
    estudianteId: number;
    cursoId: number;
    fecha: string;
    estado: string;
    observacion?: string;
    registradoPor?: string;
  }) {
    const estadoEnum: EstadoAsistencia =
      data.estado === 'P' ? EstadoAsistencia.PRESENTE : data.estado === 'A' ? EstadoAsistencia.ATRASO : EstadoAsistencia.FALTA;

    const nuevaAsistencia = await this.prisma.asistencia.create({
      data: {
        estudianteId: Number(data.estudianteId),
        cursoId: Number(data.cursoId),
        fecha: new Date(data.fecha),
        estado: estadoEnum,
        observacion: data.observacion,
        registradoPor: data.registradoPor,
      },
      include: {
        estudiante: true,
        curso: { include: { materia: true } },
      },
    });

    // Disparar evento a n8n si es Falta o Atraso
    if (estadoEnum !== EstadoAsistencia.PRESENTE) {
      this.n8nService.notificarEvento('ALERTA_ASISTENCIA', {
        idAsistencia: nuevaAsistencia.id,
        estudiante: `${nuevaAsistencia.estudiante.nombres} ${nuevaAsistencia.estudiante.apellidos}`,
        correoEstudiante: nuevaAsistencia.estudiante.correo,
        materia: nuevaAsistencia.curso.materia.nombre,
        estado: estadoEnum,
        fecha: nuevaAsistencia.fecha.toISOString().split('T')[0],
      });
    }

    return nuevaAsistencia;
  }

  async actualizar(
    id: number,
    data: {
      estado?: string;
      observacion?: string;
    },
  ) {
    const existe = await this.prisma.asistencia.findUnique({ where: { id: Number(id) } });
    if (!existe) throw new NotFoundException('Registro de asistencia no encontrado');

    const updateData: any = {};
    if (data.estado) {
      updateData.estado =
        data.estado === 'P' ? EstadoAsistencia.PRESENTE : data.estado === 'A' ? EstadoAsistencia.ATRASO : EstadoAsistencia.FALTA;
    }
    if (data.observacion !== undefined) updateData.observacion = data.observacion;

    return this.prisma.asistencia.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  async eliminar(id: number) {
    const existe = await this.prisma.asistencia.findUnique({ where: { id: Number(id) } });
    if (!existe) throw new NotFoundException('Registro de asistencia no encontrado');

    await this.prisma.asistencia.delete({ where: { id: Number(id) } });
    return { mensaje: 'Registro de asistencia eliminado correctamente' };
  }
}
