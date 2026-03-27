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

        const workflows = await this.workflowRepository.findByTrigger(
            'order.created'
        );

        console.log('Workflows trouvés:', workflows.map(w => ({ id: w.id, name: w.name })));

        for (const workflow of workflows) {
            await this.engine.execute(workflow.id, workflow.actions, payload);
        }
    }
}
