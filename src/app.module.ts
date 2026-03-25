import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { AdminModule } from './admin/admin.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, OrdersModule, AdminModule, EventEmitterModule.forRoot()],
})
export class AppModule { }
