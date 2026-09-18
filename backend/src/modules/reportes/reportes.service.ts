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
    const presentes = await this.prisma.asistencia.count({
      where: { estado: 'PRESENTE' },
    });
    const atrasos = await this.prisma.asistencia.count({
      where: { estado: 'ATRASO' },
    });
    const faltas = await this.prisma.asistencia.count({
      where: { estado: 'FALTA' },
    });
    const totalAlertas = atrasos + faltas;

    const totalJustificaciones = await this.prisma.justificacion.count();
    const justificacionesAprobadas = await this.prisma.justificacion.count({
      where: { estado: 'APROBADO' },
    });
    const justificacionesPendientes = await this.prisma.justificacion.count({
      where: { estado: 'PENDIENTE' },
    });
    const justificacionesRechazadas = await this.prisma.justificacion.count({
      where: { estado: 'RECHAZADO' },
    });

    const porcentajeAsistencia =
      totalAsistencias > 0
        ? Number(((presentes / totalAsistencias) * 100).toFixed(1))
        : 0;

    const porcentajeInasistencia =
      totalAsistencias > 0
        ? Number((((atrasos + faltas) / totalAsistencias) * 100).toFixed(1))
        : 0;

    const estudiantesConMayorCantidadDeIncidenciasRaw =
      await this.prisma.asistencia.groupBy({
        by: ['estudianteId'],
        where: { estado: { in: ['ATRASO', 'FALTA'] } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5,
      });

    const idsEstudiantes = estudiantesConMayorCantidadDeIncidenciasRaw.map(
      (item) => item.estudianteId,
    );
    const estudiantes =
      idsEstudiantes.length > 0
        ? await this.prisma.usuario.findMany({
            where: { id: { in: idsEstudiantes } },
            select: { id: true, nombres: true, apellidos: true },
          })
        : [];

    const estudiantesConMayorCantidadDeIncidencias =
      estudiantesConMayorCantidadDeIncidenciasRaw.map((item) => {
        const estudiante = estudiantes.find((u) => u.id === item.estudianteId);
        return {
          estudianteId: item.estudianteId,
          estudiante: estudiante
            ? `${estudiante.nombres} ${estudiante.apellidos}`
            : 'Sin datos disponibles',
          incidencias: item._count.id,
        };
      });

    const cursosConMayorCantidadDeIncidenciasRaw =
      await this.prisma.asistencia.groupBy({
        by: ['cursoId'],
        where: { estado: { in: ['ATRASO', 'FALTA'] } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5,
      });

    const idsCursos = cursosConMayorCantidadDeIncidenciasRaw.map(
      (item) => item.cursoId,
    );
    const cursos =
      idsCursos.length > 0
        ? await this.prisma.curso.findMany({
            where: { id: { in: idsCursos } },
            select: {
              id: true,
              nombre: true,
              materia: { select: { nombre: true } },
            },
          })
        : [];

    const cursosConMayorCantidadDeIncidencias =
      cursosConMayorCantidadDeIncidenciasRaw.map((item) => {
        const curso = cursos.find((c) => c.id === item.cursoId);
        return {
          cursoId: item.cursoId,
          curso: curso
            ? `${curso.materia.nombre} / ${curso.nombre}`
            : 'Sin datos disponibles',
          incidencias: item._count.id,
        };
      });

    const ultimosDias = await this.prisma.asistencia.groupBy({
      by: ['fecha'],
      _count: { id: true },
      orderBy: { fecha: 'asc' },
      take: 7,
    });

    let tendenciaAsistencia = 'Sin datos disponibles';
    if (ultimosDias.length > 1) {
      const primerValor = ultimosDias[0]._count.id;
      const ultimoValor = ultimosDias[ultimosDias.length - 1]._count.id;
      const variacion =
        primerValor === 0
          ? 0
          : Number(
              (((ultimoValor - primerValor) / primerValor) * 100).toFixed(1),
            );
      tendenciaAsistencia = `${variacion >= 0 ? 'Crecimiento' : 'Disminución'} de ${Math.abs(variacion)}% en registros de asistencia`;
    }

    const tendenciaJustificaciones =
      totalJustificaciones > 0
        ? `${justificacionesPendientes} pendientes / ${justificacionesAprobadas} aprobadas / ${justificacionesRechazadas} rechazadas`
        : 'Sin datos disponibles';

    const tendenciaAlertas =
      totalAlertas > 0
        ? `${totalAlertas} alertas registradas en el período`
        : 'Sin datos disponibles';

    return {
      periodo: filtros?.periodo || 'Últimas 24 horas',
      metricas: {
        totalEstudiantes,
        totalAsistencias,
        totalInasistencias: faltas,
        totalAtrasos: atrasos,
        totalAlertas,
        totalJustificaciones,
        justificacionesAprobadas,
        justificacionesPendientes,
        justificacionesRechazadas,
        porcentajeAsistencia,
        porcentajeInasistencia,
        estudiantesConMayorCantidadDeIncidencias,
        cursosConMayorCantidadDeIncidencias,
      },
      tendencias: {
        asistencia: tendenciaAsistencia,
        alertas: tendenciaAlertas,
        justificaciones: tendenciaJustificaciones,
      },
      resumen: {
        resumenGeneral:
          totalAlertas > 0 || totalJustificaciones > 0
            ? 'Se registraron incidencias relevantes durante el período analizado.'
            : 'Sin datos disponibles',
        comportamientoAsistencia:
          porcentajeAsistencia >= 80
            ? 'Asistencia estable y dentro del rango esperado.'
            : 'Hay variación en la asistencia que requiere revisión.',
        alertasRelevantes:
          totalAlertas > 0
            ? `${totalAlertas} alertas registradas.`
            : 'Sin datos disponibles',
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

    const porcentaje =
      totalAsistencias > 0
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
