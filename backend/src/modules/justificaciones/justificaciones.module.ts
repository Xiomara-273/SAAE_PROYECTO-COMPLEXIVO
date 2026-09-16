import { Module } from '@nestjs/common';
import { JustificacionesController } from './justificaciones.controller';
import { JustificacionesService } from './justificaciones.service';

@Module({
  controllers: [JustificacionesController],
  providers: [JustificacionesService],
  exports: [JustificacionesService],
})
export class JustificacionesModule {}
