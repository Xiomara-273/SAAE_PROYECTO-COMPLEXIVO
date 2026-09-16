import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CarrerasService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerTodas() {
    return this.prisma.carrera.findMany({
      include: { materias: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async obtenerPorId(id: number) {
    const carrera = await this.prisma.carrera.findUnique({
      where: { id: Number(id) },
      include: { materias: true },
    });
    if (!carrera) throw new NotFoundException('Carrera no encontrada');
    return carrera;
  }

  async crear(data: { codigo: string; nombre: string; descripcion?: string }) {
    return this.prisma.carrera.create({ data });
  }

  async actualizar(id: number, data: { codigo?: string; nombre?: string; descripcion?: string; estado?: boolean }) {
    return this.prisma.carrera.update({
      where: { id: Number(id) },
      data,
    });
  }

  async eliminar(id: number) {
    await this.prisma.carrera.delete({ where: { id: Number(id) } });
    return { mensaje: 'Carrera eliminada correctamente' };
  }
}
