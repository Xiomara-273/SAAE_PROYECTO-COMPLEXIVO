import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registrar(
    @Body()
    datos: {
      cedula: string;
      nombres: string;
      apellidos: string;
      correo: string;
      password: string;
      rol?: string;
    },
  ) {
    return this.authService.registrar(datos);
  }

  @Post('login')
  async login(
    @Body()
    datos: {
      correo: string;
      password: string;
    },
  ) {
    return this.authService.login(
      datos.correo,
      datos.password,
    );
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  perfil(@Request() request: any) {
    return {
      mensaje: 'Token válido',
      usuario: request.user,
    };
  }
}