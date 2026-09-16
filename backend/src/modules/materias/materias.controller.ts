import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MateriasService } from './materias.service';

@Controller('api/materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Get()
  obtenerTodas() {
    return this.materiasService.obtenerTodas();
  }

  @Post()
  crear(@Body() body: any) {
    return this.materiasService.crear(body);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() body: any) {
    return this.materiasService.actualizar(Number(id), body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.materiasService.eliminar(Number(id));
  }
}
