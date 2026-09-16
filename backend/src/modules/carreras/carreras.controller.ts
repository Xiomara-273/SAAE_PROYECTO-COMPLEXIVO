import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarrerasService } from './carreras.service';

@Controller('api/carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Get()
  obtenerTodas() {
    return this.carrerasService.obtenerTodas();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.carrerasService.obtenerPorId(Number(id));
  }

  @Post()
  crear(@Body() body: any) {
    return this.carrerasService.crear(body);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() body: any) {
    return this.carrerasService.actualizar(Number(id), body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.carrerasService.eliminar(Number(id));
  }
}
