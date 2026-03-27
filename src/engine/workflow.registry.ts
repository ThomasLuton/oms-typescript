import { Injectable } from "@nestjs/common";
import { ActionExecutor, CreateLogAction, NotifyUserAction, NotifyAdminAction, CreateTaskAction, ConditionAction } from "./workflow.action";

@Injectable()
export class ActionRegistry {

    private actions = new Map<string, ActionExecutor>();

    constructor() {
        this.register(new CreateLogAction());
        this.register(new NotifyUserAction());
        this.register(new NotifyAdminAction());
        this.register(new CreateTaskAction());
        this.register(new ConditionAction());
    }

    private register(action: ActionExecutor) {
        this.actions.set(action.type, action);
    }

    get(type: string): ActionExecutor | undefined {
        return this.actions.get(type);
    }

}