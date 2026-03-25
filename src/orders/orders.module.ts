import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [PrismaService, OrdersRepository, OrdersService],
  exports: [OrdersRepository],
})
export class OrdersModule {}