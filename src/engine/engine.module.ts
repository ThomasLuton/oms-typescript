import { Module } from "@nestjs/common";
import { WorkflowListener } from "./workflow.listener";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowsRepository } from "src/workflows/workflows.repository";
import { WorkflowEngine } from "./workflow.engine";
import { PrismaService } from "src/prisma/prisma.service";
import { EngineController } from "src/workflow-engine/engine.controller";
import { ExecutionRepository } from "src/workflow-engine/execution.repository";

@Module({
    imports: [],
    controllers: [EngineController],
    providers: [WorkflowListener, ActionRegistry, WorkflowsRepository, WorkflowEngine, PrismaService, ExecutionRepository],
    exports: [],
})
export class EngineModule { }