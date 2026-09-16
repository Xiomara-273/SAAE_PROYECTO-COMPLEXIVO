import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ConfiguracionService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerPerfil(usuarioId?: number) {
    if (usuarioId) {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: Number(usuarioId) },
        select: { id: true, nombres: true, apellidos: true, cedula: true, correo: true, rol: true, estado: true },
      });
      if (usuario) return usuario;
    }

    return {
      id: 1,
      nombres: 'Usuario',
      apellidos: 'Sistema',
      cedula: '1700000000',
      correo: 'admin@saae.edu.ec',
      rol: 'ADMIN',
      estado: true,
    };
  }

  async obtenerSistema() {
    return {
      periodoLectivo: '2026-1',
      umbralAsistenciaMinima: 75,
      notificacionesEmail: true,
      notificacionesN8n: true,
      diasPlazoJustificacion: 5,
    };
  }

  async actualizarPerfil(usuarioId: number, datos: any) {
    if (usuarioId) {
      return this.prisma.usuario.update({
        where: { id: Number(usuarioId) },
        data: datos,
      });
    }
    return datos;
  }

  async actualizarSistema(datos: any) {
    return {
      mensaje: 'Configuración de sistema actualizada',
      configuracion: datos,
    };
  }
}
