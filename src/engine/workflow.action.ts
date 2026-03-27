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
        return true;
    }
}

@Injectable()
export class NotifyAdminAction implements ActionExecutor {
    type = "notify_admin";

    execute(payload: any, config?: any): boolean {
        console.log("Notify admin with message:", payload.message);
        return true;
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

@Injectable()
export class CreateTaskAction implements ActionExecutor {
    type = "create_task";

    execute(payload: any, config?: any): boolean {
        console.log("Creating task:", payload.taskTitle);
        return true;
    }
}

@Injectable()
export class ConditionAction implements ActionExecutor {
    type = "condition";

    execute(payload: any, config?: any): boolean {
        if (!config || !config.field || !config.operator) {
            return false;
        }

        const currentValue = payload.prix;
        const targetValue = config.value;
        const operator = config.operator;

        switch (operator) {
            case ">":  return currentValue > targetValue;
            case "<":  return currentValue < targetValue;
            case ">=": return currentValue >= targetValue;
            case "<=": return currentValue <= targetValue;
            case "==": return currentValue == targetValue;
            case "!=": return currentValue != targetValue;
            default:
                console.warn(`Opérateur non supporté : ${operator}`);
                return false;
        }
    }
}