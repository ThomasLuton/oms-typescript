import { Injectable } from "@nestjs/common";
import { ActionRegistry } from "./workflow.registry";
import { WorkflowAction } from "generated/prisma/client";
import { ExecutionRepository } from "src/engine/execution.repository";

@Injectable()
export class WorkflowEngine {
    constructor(
        private registry: ActionRegistry,
        private executionRepository: ExecutionRepository
    ) { }

    async execute(workflowId: number, actions: WorkflowAction[] | undefined, payload: any) {
        const actionResults: { type: string; status: string; error?: string }[] = [];

        if (!actions?.length) return;

        // Tri par 'order' si Prisma ne l'a pas fait, pour garantir la séquence
        const sortedActions = [...actions].sort((a, b) => (a.order || 0) - (b.order || 0));

        for (const action of sortedActions) {
            const executor = this.registry.get(action.type);

            if (!executor) {
                console.error(`Action ${action.type} is unknown`);
                actionResults.push({ type: action.type, status: "failure", error: "Executor not found" });
                break; // Stop le workflow
            }

            try {
                // Utilisation de la config spécifique à CETTE action
                const success = await executor.execute(payload, action.config);

                if (success) {
                    console.log(`Action ${action.type} is a success`);
                    actionResults.push({ type: action.type, status: 'success' });
                } else {
                    console.log(`Action ${action.type} is a failure (Condition not met or internal fail)`);
                    actionResults.push({ type: action.type, status: 'failed' });
                    break; // On arrête la chaîne ici
                }
            } catch (err) {
                console.error(`Error executing ${action.type}:`, err);
                actionResults.push({ type: action.type, status: 'failure', error: err.message });
                break;
            }
        }

        // Sauvegarde pour observabilité
        const globalStatus = actionResults.every(r => r.status === 'success') ? 'success' : 'failed';

        await this.executionRepository.save({
            workflowId,
            status: globalStatus,
            actions: actionResults 
        });
    }
}
