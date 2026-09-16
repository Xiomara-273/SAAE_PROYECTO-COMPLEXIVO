import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { N8nService } from './n8n.service';
import { N8nGuard } from './n8n.guard';

@Controller('api/n8n')
export class N8nController {
  constructor(private readonly n8nService: N8nService) {}

  @Post('webhook')
  @UseGuards(N8nGuard)
  recibirWebhook(@Body() body: any) {
    return this.n8nService.procesarAccionEntrante(body);
  }

  @Post('test')
  probarConexion(@Body() body: any) {
    return this.n8nService.notificarEvento('PRUEBA_CONEXION', body || { mensaje: 'Prueba desde SAAE Backend' });
  }

  @Get('estado')
  obtenerEstado() {
    return {
      estado: 'ACTIVO',
      modulo: 'Integración n8n Webhooks',
      timestamp: new Date().toISOString(),
    };
  }
}
