import { Injectable } from "@nestjs/common";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowAction } from "generated/prisma/client";
import { ExecutionRepository } from "src/workflow-engine/execution.repository";

@Injectable()
export class WorkflowEngine {

    constructor(
        private registry: ActionRegistry,
        private executionRepository: ExecutionRepository
    ) { }

    async execute(workflowId: number, actions: WorkflowAction[] | undefined, payload: any, config?: any) {
        const actionResults: { type: string; status: string; error?: string}[] = [];

        if (!actions?.length) return;

        loop: for (let i = 0; actions?.length && i < actions.length; i++) {
            const executor = this.registry.get(actions[i].type);
        
            if (!executor) {
                console.log("Action " + actions[i].type + " is unknown");
                actionResults.push({ type: actions[i].type, status: "failure", error: "Executor not found" });
                break loop;
            }
            const success = executor.execute(payload, config);

            if (success) {
                console.log("Action " + actions[i].type + " is a success");
                actionResults.push({ type: actions[i].type, status: 'success' });
            } else {
                console.log("Action " + actions[i].type + " is a failure");
                actionResults.push({ type: actions[i].type, status: 'failed' });
                break loop;
            }
        }

        // save the result on base for observability
        const globalStatus = actionResults.every(r => r.status === 'success')
            ? 'success'
            : 'failed';

        await this.executionRepository.save({
            workflowId,
            status: globalStatus,
            actions: actionResults 
        });
    }
}
