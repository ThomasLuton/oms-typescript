import { Module } from "@nestjs/common";
import { WorkflowListener } from "./workflow.listener";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowsRepository } from "src/workflows/workflows.repository";
import { WorkflowEngine } from "./workflow.engine";
import { PrismaService } from "src/prisma/prisma.service";
import { EngineController } from "src/engine/engine.controller";
import { ExecutionRepository } from "src/engine/execution.repository";
import { WorkflowCron } from "./workflow.cron";

@Module({
    imports: [],
    controllers: [EngineController],
    providers: [
        WorkflowListener,
        ActionRegistry,
        WorkflowsRepository,
        WorkflowEngine,
        PrismaService,
        ExecutionRepository,
        WorkflowCron
    ],
    exports: [],
})
export class EngineModule { }