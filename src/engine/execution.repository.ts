import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExecutionRepository {
    constructor(private prisma: PrismaService) { }

    async save(data: {
        workflowId: number;
        status: string;
        actions: { type: string; status: string; error?: string }[];
    }) {
        return this.prisma.execution.create({
            data: {
                workflowId: data.workflowId,
                status: data.status,
                actions: data.actions,
            },
        });
    }

    async findByWorkflowId(workflowId: number) {
        return this.prisma.execution.findMany({
            where: { workflowId },
            orderBy: { executedAt: 'desc' },
        });
    }
}
