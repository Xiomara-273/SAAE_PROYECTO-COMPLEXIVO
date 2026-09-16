import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class N8nGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['x-n8n-api-key'] || request.headers['x-webhook-secret'];
    const secretEsperado = this.configService.get<string>('N8N_API_KEY') || 'SAAE_N8N_SECRET_KEY_2026';

    if (!apiKeyHeader || apiKeyHeader !== secretEsperado) {
      throw new UnauthorizedException('Acceso no autorizado desde n8n: Clave de API inválida');
    }

    return true;
  }
}
