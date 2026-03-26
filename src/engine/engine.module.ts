import { Module } from "@nestjs/common";
import { WorkflowListener } from "./workflow.listener";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowsRepository } from "src/workflows/workflows.repository";
import { WorkflowEngine } from "./workflow.engine";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [],
    controllers: [],
    providers: [WorkflowListener, ActionRegistry, WorkflowsRepository, WorkflowEngine, PrismaService],
    exports: [],
})
export class EngineModule { }