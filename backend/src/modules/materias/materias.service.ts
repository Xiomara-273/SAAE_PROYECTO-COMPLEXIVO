import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MateriasService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerTodas() {
    return this.prisma.materia.findMany({
      include: { carrera: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async crear(data: { codigo: string; nombre: string; carreraId: number }) {
    return this.prisma.materia.create({
      data: {
        codigo: data.codigo,
        nombre: data.nombre,
        carreraId: Number(data.carreraId),
      },
    });
  }

  async actualizar(id: number, data: { codigo?: string; nombre?: string; carreraId?: number; estado?: boolean }) {
    const updateData: any = { ...data };
    if (data.carreraId) updateData.carreraId = Number(data.carreraId);

    return this.prisma.materia.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  async eliminar(id: number) {
    await this.prisma.materia.delete({ where: { id: Number(id) } });
    return { mensaje: 'Materia eliminada correctamente' };
  }
}
