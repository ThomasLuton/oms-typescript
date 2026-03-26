import { Injectable } from "@nestjs/common";
import { Workflow } from "generated/prisma/client";

export interface ActionExecutor {
    type: string;

    execute(payload: any, config?: any): void;
}

@Injectable()
export class NotifyUserAction implements ActionExecutor {
    type = "notify_user";

    execute(payload: any, config?: any): void {
        console.log("Notify user", payload.userId);
    }
}

@Injectable()
export class CreateLogAction implements ActionExecutor {
    type = "create_log"

    execute(payload: any, config?: any): void {
        console.log("Log : " + payload.log + " at " + new Date(Date.now()))
    }
}