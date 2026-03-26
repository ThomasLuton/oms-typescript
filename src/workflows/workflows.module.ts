import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsRepository } from './workflows.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [AuthModule],
    controllers: [WorkflowsController],
    providers: [WorkflowsService, WorkflowsRepository, PrismaService],
    exports: [WorkflowsService],
})
export class WorkflowsModule {}
