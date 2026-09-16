import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportesService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerReporteAnalitico(filtros?: any) {
    const totalEstudiantes = await this.prisma.usuario.count({
      where: { rol: 'ESTUDIANTE', estado: true },
    });

    const totalAsistencias = await this.prisma.asistencia.count();
    const presentes = await this.prisma.asistencia.count({ where: { estado: 'PRESENTE' } });
    const atrasos = await this.prisma.asistencia.count({ where: { estado: 'ATRASO' } });
    const faltas = await this.prisma.asistencia.count({ where: { estado: 'FALTA' } });

    const porcentajeAsistencia = totalAsistencias > 0
      ? Number(((presentes / totalAsistencias) * 100).toFixed(1))
      : 0;

    const justificacionesPendientes = await this.prisma.justificacion.count({
      where: { estado: 'PENDIENTE' },
    });

    return {
      indicadores: {
        asistencia: porcentajeAsistencia,
        estudiantes: totalEstudiantes,
        riesgo: faltas,
        justificaciones: justificacionesPendientes,
      },
      distribucion: {
        presentes,
        atrasos,
        faltas,
      },
    };
  }

  async obtenerDashboardEstudiante(estudianteId: number) {
    const totalAsistencias = await this.prisma.asistencia.count({
      where: { estudianteId: Number(estudianteId) },
    });

    const presentes = await this.prisma.asistencia.count({
      where: { estudianteId: Number(estudianteId), estado: 'PRESENTE' },
    });
    const atrasos = await this.prisma.asistencia.count({
      where: { estudianteId: Number(estudianteId), estado: 'ATRASO' },
    });
    const faltas = await this.prisma.asistencia.count({
      where: { estudianteId: Number(estudianteId), estado: 'FALTA' },
    });

    const porcentaje = totalAsistencias > 0
      ? Number(((presentes / totalAsistencias) * 100).toFixed(1))
      : 100;

    return {
      estudianteId: Number(estudianteId),
      porcentajeAsistencia: porcentaje,
      presentes,
      atrasos,
      faltas,
      totalClases: totalAsistencias,
    };
  }
}
