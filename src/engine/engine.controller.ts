import { Controller, UseGuards, Get, Param } from "@nestjs/common";
import { JwtGuard } from "src/auth/auth.guard";
import { ExecutionRepository } from "./execution.repository";

@UseGuards(JwtGuard)
@Controller('executions')
export class EngineController {
    constructor(private executionRepository: ExecutionRepository) { }

    @Get(':workflowId')
    async getExecution(@Param('workflowId') workflowId: number) {
        return this.executionRepository.findByWorkflowId(workflowId);
    }
}
