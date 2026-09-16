import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class N8nService {
  private readonly logger = new Logger(N8nService.name);

  constructor(private readonly configService: ConfigService) {}

  async notificarEvento(tipoEvento: string, payload: any): Promise<boolean> {
    const webhookUrl = this.configService.get<string>('N8N_WEBHOOK_URL') || 'http://localhost:5678/webhook/saae-eventos';
    const apiKey = this.configService.get<string>('N8N_API_KEY') || 'SAAE_N8N_SECRET_KEY_2026';

    const cuerpoMensaje = {
      evento: tipoEvento,
      timestamp: new Date().toISOString(),
      data: payload,
    };

    try {
      this.logger.log(`Enviando evento '${tipoEvento}' a n8n en ${webhookUrl}`);
      const respuesta = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': apiKey,
        },
        body: JSON.stringify(cuerpoMensaje),
      });

      if (!respuesta.ok) {
        this.logger.warn(`n8n respondió con estado HTTP ${respuesta.status}`);
        return false;
      }

      this.logger.log(`Evento '${tipoEvento}' entregado a n8n correctamente`);
      return true;
    } catch (error: any) {
      this.logger.error(`Error al conectar con el servidor n8n (${webhookUrl}): ${error.message}`);
      return false;
    }
  }

  async procesarAccionEntrante(datos: any) {
    this.logger.log(`Acción recibida desde n8n: ${JSON.stringify(datos)}`);
    return {
      exito: true,
      mensaje: 'Acción procesada correctamente por el backend SAAE',
      procesadoEn: new Date().toISOString(),
      datosRecibidos: datos,
    };
  }
}
