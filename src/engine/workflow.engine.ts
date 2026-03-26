import { Injectable } from "@nestjs/common";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowAction } from "generated/prisma/client";

@Injectable()
export class WorkflowEngine {

    constructor(
        private registry: ActionRegistry
    ) { }

    async execute(actions: WorkflowAction[] | undefined, payload: any, config?: any) {
        loop: for (let i = 0; actions?.length && i < actions.length; i++) {
            const executor = this.registry.get(actions[i].type);
            if (executor?.execute(payload, config)) {
                console.log("Action " + actions[i].type + " is a success")
            } else {
                console.log("Action " + actions[i].type + " is a failure")
                break loop;
            }
        }
    }
}




