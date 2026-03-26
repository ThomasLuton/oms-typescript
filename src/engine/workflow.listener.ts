import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WorkflowsRepository } from "src/workflows/workflows.repository";
import { WorkflowEngine } from "./workflow.engine";

@Injectable()
export class WorkflowListener {

    constructor(private readonly workflowRepository: WorkflowsRepository, private readonly engine: WorkflowEngine
    ) { }

    @OnEvent('order.created')
    async handleOrderCreated(payload: any) {

        const workflow = await this.workflowRepository.findByTrigger(
            'order.created'
        );

        this.engine.execute(workflow?.actions, payload)

    }

}