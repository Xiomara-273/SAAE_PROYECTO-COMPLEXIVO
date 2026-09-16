import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { AsistenciaModule } from './modules/asistencia/asistencia.module';
import { JustificacionesModule } from './modules/justificaciones/justificaciones.module';
import { CarrerasModule } from './modules/carreras/carreras.module';
import { MateriasModule } from './modules/materias/materias.module';
import { CursosModule } from './modules/cursos/cursos.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { N8nModule } from './modules/n8n/n8n.module';
import { ConfiguracionModule } from './modules/configuracion/configuracion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    N8nModule,

    AuthModule,
    HealthModule,
    AsistenciaModule,
    JustificacionesModule,
    CarrerasModule,
    MateriasModule,
    CursosModule,
    ReportesModule,
    ConfiguracionModule,
  ],
})
export class AppModule {}
