import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';

@Controller('api/asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Get()
  obtenerAsistencias(
    @Query('estudianteId') estudianteId?: number,
    @Query('cursoId') cursoId?: number,
    @Query('fecha') fecha?: string,
  ) {
    return this.asistenciaService.obtenerTodas({ estudianteId, cursoId, fecha });
  }

  @Post()
  guardarAsistencia(@Body() body: any) {
    return this.asistenciaService.guardar(body);
  }

  @Put(':id')
  actualizarAsistencia(@Param('id') id: string, @Body() body: any) {
    return this.asistenciaService.actualizar(Number(id), body);
  }

  @Delete(':id')
  eliminarAsistencia(@Param('id') id: string) {
    return this.asistenciaService.eliminar(Number(id));
  }
}
