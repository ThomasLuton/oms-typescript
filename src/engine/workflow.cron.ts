import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { WorkflowsRepository } from "src/workflows/workflows.repository";
import { WorkflowEngine } from "./workflow.engine";

@Injectable()
export class WorkflowCron {
    private readonly logger = new Logger(WorkflowCron.name);

    constructor(
        private readonly workflowRepository: WorkflowsRepository, 
        private readonly engine: WorkflowEngine
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        this.logger.log('Cron déclenché — recherche des workflows planifiés');

        const workflows = await this.workflowRepository.findByTrigger('manual.trigger');

        if (!workflows.length) {
            this.logger.log('Aucun workflow planifié trouvé');
            return;
        }

        this.logger.log(`${workflows.length} workflows planifiés trouvés`);

        for (const workflow of workflows) {
            this.logger.log(`Exécution du workflow planifié: ${workflow.name} (ID: ${workflow.id})`);

            await this.engine.execute(workflow.id, workflow.actions, { 
                trigger: 'manual.trigger',
                scheduledAt: new Date(),
            });
        }
    }
}
