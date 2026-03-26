import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, OrdersModule, WorkflowsModule],
})
export class AppModule {}
