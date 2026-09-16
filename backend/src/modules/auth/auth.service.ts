import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { Rol } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(datos: {
    cedula: string;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    rol?: string;
  }) {
    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: {
        OR: [
          { correo: datos.correo },
          { cedula: datos.cedula },
        ],
      },
    });

    if (usuarioExistente) {
      throw new ConflictException(
        'El correo o la cédula ya están registrados',
      );
    }

    const passwordEncriptada = await bcrypt.hash(datos.password, 10);

    const rolEnum = (datos.rol as Rol) || Rol.ESTUDIANTE;

    const usuarioGuardado = await this.prisma.usuario.create({
      data: {
        cedula: datos.cedula,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        correo: datos.correo,
        password: passwordEncriptada,
        rol: rolEnum,
        estado: true,
      },
    });

    return {
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: usuarioGuardado.id,
        id_usuario: usuarioGuardado.id,
        cedula: usuarioGuardado.cedula,
        nombres: usuarioGuardado.nombres,
        apellidos: usuarioGuardado.apellidos,
        correo: usuarioGuardado.correo,
        rol: usuarioGuardado.rol,
        estado: usuarioGuardado.estado,
      },
    };
  }

  async login(correo: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    if (!usuario.estado) {
      throw new UnauthorizedException(
        'El usuario se encuentra inactivo',
      );
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password,
    );

    if (!passwordCorrecta) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const token = this.jwtService.sign({
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    });

    return {
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        id_usuario: usuario.id,
        cedula: usuario.cedula,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol,
        estado: usuario.estado,
      },
    };
  }
}