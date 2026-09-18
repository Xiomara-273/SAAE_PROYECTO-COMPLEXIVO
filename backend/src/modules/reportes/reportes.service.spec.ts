import { ReportesService } from './reportes.service';

describe('ReportesService', () => {
  let service: ReportesService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      usuario: {
        count: jest.fn(),
        findMany: jest.fn(),
      },
      asistencia: {
        count: jest.fn(),
        groupBy: jest.fn(),
      },
      justificacion: {
        count: jest.fn(),
        groupBy: jest.fn(),
      },
      curso: {
        findMany: jest.fn(),
      },
    };

    service = new ReportesService(prisma);
  });

  it('should return structured daily analytic metrics', async () => {
    prisma.usuario.count.mockResolvedValue(120);
    prisma.usuario.findMany.mockResolvedValue([
      { id: 1, nombres: 'Ana', apellidos: 'Pérez' },
      { id: 2, nombres: 'Luis', apellidos: 'Torres' },
    ]);
    prisma.curso.findMany.mockResolvedValue([
      { id: 10, nombre: 'P1', materia: { nombre: 'Matemática' } },
      { id: 11, nombre: 'P2', materia: { nombre: 'Historia' } },
    ]);

    prisma.asistencia.count
      .mockResolvedValueOnce(500)
      .mockResolvedValueOnce(410)
      .mockResolvedValueOnce(60)
      .mockResolvedValueOnce(30);

    prisma.asistencia.groupBy
      .mockResolvedValueOnce([
        { estudianteId: 1, _count: { id: 4 } },
        { estudianteId: 2, _count: { id: 3 } },
      ])
      .mockResolvedValueOnce([
        { cursoId: 10, _count: { id: 5 } },
        { cursoId: 11, _count: { id: 4 } },
      ]);

    prisma.justificacion.count
      .mockResolvedValueOnce(25)
      .mockResolvedValueOnce(15)
      .mockResolvedValueOnce(7)
      .mockResolvedValueOnce(3);

    prisma.justificacion.groupBy.mockResolvedValue([
      { estado: 'APROBADO', _count: { id: 15 } },
      { estado: 'PENDIENTE', _count: { id: 7 } },
      { estado: 'RECHAZADO', _count: { id: 3 } },
    ]);

    const result = await service.obtenerReporteAnalitico({});

    expect(result.metricas).toMatchObject({
      totalEstudiantes: 120,
      totalAsistencias: 500,
      totalInasistencias: 60,
      totalAtrasos: 30,
      totalAlertas: 90,
      totalJustificaciones: 25,
      justificacionesAprobadas: 15,
      justificacionesPendientes: 7,
      justificacionesRechazadas: 3,
      porcentajeAsistencia: 82,
      porcentajeInasistencia: 12,
    });
    expect(result.metricas.estudiantesConMayorCantidadDeIncidencias).toEqual(
      expect.any(Array),
    );
    expect(result.metricas.cursosConMayorCantidadDeIncidencias).toEqual(
      expect.any(Array),
    );
    expect(result.tendencias).toEqual(expect.any(Object));
  });
});
