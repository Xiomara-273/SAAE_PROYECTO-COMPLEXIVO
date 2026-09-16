import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';

@Controller('api/configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Get('perfil')
  obtenerPerfil(@Query('usuarioId') usuarioId?: number) {
    return this.configuracionService.obtenerPerfil(usuarioId);
  }

  @Get('sistema')
  obtenerSistema() {
    return this.configuracionService.obtenerSistema();
  }

  @Put('perfil')
  actualizarPerfil(@Query('usuarioId') usuarioId: number, @Body() body: any) {
    return this.configuracionService.actualizarPerfil(usuarioId, body);
  }

  @Put('sistema')
  actualizarSistema(@Body() body: any) {
    return this.configuracionService.actualizarSistema(body);
  }
}
