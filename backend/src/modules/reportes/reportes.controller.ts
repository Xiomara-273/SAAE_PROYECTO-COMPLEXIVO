import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('api')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('reportes/analitica')
  obtenerAnalitica(@Query() filtros: any) {
    return this.reportesService.obtenerReporteAnalitico(filtros);
  }

  @Get('analitica')
  obtenerAnaliticaAlias(@Query() filtros: any) {
    return this.reportesService.obtenerReporteAnalitico(filtros);
  }

  @Get('dashboard-estudiante/:id')
  obtenerDashboardEstudiante(@Param('id') id: string) {
    return this.reportesService.obtenerDashboardEstudiante(Number(id));
  }
}
