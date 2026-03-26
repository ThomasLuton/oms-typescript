import { Injectable } from "@nestjs/common";
import { Workflow } from "generated/prisma/client";

export interface ActionExecutor {
    type: string;

    execute(payload: any, config?: any): boolean;
}

@Injectable()
export class NotifyUserAction implements ActionExecutor {
    type = "notify_user";

    execute(payload: any, config?: any): boolean {
        console.log("Notify user", payload.userId);
        return false;
    }
}

@Injectable()
export class CreateLogAction implements ActionExecutor {
    type = "create_log"

    execute(payload: any, config?: any): boolean {
        console.log("Log : " + payload.log + " at " + new Date(Date.now()))
        return true;
    }
}