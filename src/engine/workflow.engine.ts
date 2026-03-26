import { Injectable } from "@nestjs/common";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowAction } from "generated/prisma/client";

@Injectable()
export class WorkflowEngine {

    constructor(
        private registry: ActionRegistry
    ) { }

    async execute(actions: WorkflowAction[] | undefined, payload: any, config?: any) {
        actions?.forEach((action) => {
            const executor = this.registry.get(action.type);
            executor?.execute(payload, config);
        })
    }
}




