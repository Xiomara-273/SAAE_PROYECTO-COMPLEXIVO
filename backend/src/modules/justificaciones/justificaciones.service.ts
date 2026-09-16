import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { N8nService } from '../n8n/n8n.service';
import { EstadoJustificacion } from '@prisma/client';

@Injectable()
export class JustificacionesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly n8nService: N8nService,
  ) {}

  async obtenerTodas(filtros?: { estudianteId?: number; estado?: string }) {
    const where: any = {};
    if (filtros?.estudianteId) where.estudianteId = Number(filtros.estudianteId);
    if (filtros?.estado) where.estado = filtros.estado as EstadoJustificacion;

    return this.prisma.justificacion.findMany({
      where,
      include: {
        estudiante: {
          select: { id: true, nombres: true, apellidos: true, cedula: true, correo: true },
        },
        asistencia: {
          include: {
            curso: {
              include: { materia: true },
            },
          },
        },
      },
      orderBy: { fechaSolicitud: 'desc' },
    });
  }

  async crear(data: { estudianteId: number; asistenciaId: number; motivo: string; archivoUrl?: string }) {
    const justificacion = await this.prisma.justificacion.create({
      data: {
        estudianteId: Number(data.estudianteId),
        asistenciaId: Number(data.asistenciaId),
        motivo: data.motivo,
        archivoUrl: data.archivoUrl,
        estado: EstadoJustificacion.PENDIENTE,
      },
      include: {
        estudiante: true,
      },
    });

    // Disparar evento a n8n
    this.n8nService.notificarEvento('JUSTIFICACION_CREADA', {
      idJustificacion: justificacion.id,
      estudiante: `${justificacion.estudiante.nombres} ${justificacion.estudiante.apellidos}`,
      correoEstudiante: justificacion.estudiante.correo,
      motivo: justificacion.motivo,
      fechaSolicitud: justificacion.fechaSolicitud.toISOString(),
    });

    return justificacion;
  }

  async responder(id: number, data: { estado: 'APROBADO' | 'RECHAZADO'; observacionDocente?: string }) {
    const existe = await this.prisma.justificacion.findUnique({ where: { id: Number(id) } });
    if (!existe) throw new NotFoundException('Justificación no encontrada');

    const actualizada = await this.prisma.justificacion.update({
      where: { id: Number(id) },
      data: {
        estado: data.estado as EstadoJustificacion,
        observacionDocente: data.observacionDocente,
      },
      include: { estudiante: true },
    });

    // Disparar evento de resolución a n8n
    this.n8nService.notificarEvento('JUSTIFICACION_PROCESADA', {
      idJustificacion: actualizada.id,
      estudiante: `${actualizada.estudiante.nombres} ${actualizada.estudiante.apellidos}`,
      correoEstudiante: actualizada.estudiante.correo,
      estado: actualizada.estado,
      observacionDocente: actualizada.observacionDocente,
    });

    return actualizada;
  }
}
