import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWorkflowDto } from "./workflows.dto";

@Injectable()
export class WorkflowsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, dto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        name: dto.name,
        trigger: dto.trigger,
        isActive: dto.isActive ?? true,
        userId,
        actions: dto.actions
          ? {
            create: dto.actions.map((a) => ({
              type: a.type,
              order: a.order,
            })),
          }
          : undefined,
      },
      include: { actions: true },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.workflow.findMany({
      where: { userId },
      include: { actions: { orderBy: { order: 'asc' } } },
    });
  }

  async findById(id: number, userId: number) {
    return this.prisma.workflow.findFirst({
      where: { id, userId },
      include: { actions: { orderBy: { order: 'asc' } } },
    });
  }

  async findByTrigger(trigger: string) {
    return this.prisma.workflow.findFirst({
      where: { trigger },
      include: { actions: { orderBy: { order: 'asc' } } },
    });
  }
}
