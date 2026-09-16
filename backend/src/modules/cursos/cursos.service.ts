import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CursosService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerTodos() {
    return this.prisma.curso.findMany({
      include: {
        materia: { include: { carrera: true } },
        docente: { select: { id: true, nombres: true, apellidos: true, correo: true } },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async crear(data: { nombre: string; periodo: string; materiaId: number; docenteId: number }) {
    return this.prisma.curso.create({
      data: {
        nombre: data.nombre,
        periodo: data.periodo,
        materiaId: Number(data.materiaId),
        docenteId: Number(data.docenteId),
      },
    });
  }

  async actualizar(id: number, data: { nombre?: string; periodo?: string; materiaId?: number; docenteId?: number; estado?: boolean }) {
    const updateData: any = { ...data };
    if (data.materiaId) updateData.materiaId = Number(data.materiaId);
    if (data.docenteId) updateData.docenteId = Number(data.docenteId);

    return this.prisma.curso.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  async eliminar(id: number) {
    await this.prisma.curso.delete({ where: { id: Number(id) } });
    return { mensaje: 'Curso eliminado correctamente' };
  }
}
