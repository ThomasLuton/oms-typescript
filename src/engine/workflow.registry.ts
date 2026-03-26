import { Injectable } from "@nestjs/common";
import { ActionExecutor, CreateLogAction, NotifyUserAction } from "./workflow.action";

@Injectable()
export class ActionRegistry {

    private actions = new Map<string, ActionExecutor>();

    constructor() {
        this.register(new CreateLogAction());
        this.register(new NotifyUserAction())
    }

    private register(action: ActionExecutor) {
        this.actions.set(action.type, action);
    }

    get(type: string): ActionExecutor | undefined {
        return this.actions.get(type);
    }

}