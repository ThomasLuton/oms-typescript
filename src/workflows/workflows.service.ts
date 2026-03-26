import { Injectable, NotFoundException } from "@nestjs/common";
import { WorkflowsRepository } from "./workflows.repository";
import { CreateWorkflowDto } from "./workflows.dto";


@Injectable()
export class WorkflowsService {
  constructor(private workflowsRepository: WorkflowsRepository) { }

  async create(userId: number, dto: CreateWorkflowDto) {
    return this.workflowsRepository.create(userId, dto);
  }

  async findAllByUser(userId: number) {
    return this.workflowsRepository.findAllByUser(userId);
  }

  async findById(id: number, userId: number) {
    const workflow = await this.workflowsRepository.findById(id, userId);
    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }
    return workflow;
  }
}
