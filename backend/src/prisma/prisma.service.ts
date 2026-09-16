import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexión a PostgreSQL establecida correctamente');
    } catch (error: any) {
      this.logger.warn(
        'PostgreSQL no está respondiendo en localhost:5432. El servidor NestJS se iniciará, pero asegúrate de iniciar PostgreSQL o ejecutar Docker para realizar consultas a la base de datos.',
      );
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error: any) {
      // Ignore disconnect error on shutdown
    }
  }
}
