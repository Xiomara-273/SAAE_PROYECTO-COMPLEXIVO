import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JustificacionesService } from './justificaciones.service';

@Controller('api/justificaciones')
export class JustificacionesController {
  constructor(private readonly justificacionesService: JustificacionesService) {}

  @Get()
  obtenerTodas(@Query('estudianteId') estudianteId?: number, @Query('estado') estado?: string) {
    return this.justificacionesService.obtenerTodas({ estudianteId, estado });
  }

  @Post()
  crear(@Body() body: any) {
    return this.justificacionesService.crear(body);
  }

  @Patch(':id')
  responder(@Param('id') id: string, @Body() body: any) {
    return this.justificacionesService.responder(Number(id), body);
  }
}
