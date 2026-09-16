import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CursosService } from './cursos.service';

@Controller('api/cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  obtenerTodos() {
    return this.cursosService.obtenerTodos();
  }

  @Post()
  crear(@Body() body: any) {
    return this.cursosService.crear(body);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() body: any) {
    return this.cursosService.actualizar(Number(id), body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.cursosService.eliminar(Number(id));
  }
}
