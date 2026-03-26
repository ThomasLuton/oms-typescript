import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsObject, IsString, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export enum WorkflowTrigger {
    USER_REGISTERED = "user.registered",
    ORDER_CREATED = "order.created",
    MANUAL_TRIGGER = "manual.trigger",
}

export enum ActionType {
    NOTIFY_ADMIN = "notify_admin",
    NOTIFY_USER = "notify_user",
    CREATE_LOG = "create_log",
    CREATE_TASK = "create_task",
    CONDITION = "condition"
}

export class WorkflowActionDto {
    @IsEnum(ActionType)
    type: ActionType;

    @IsInt()
    order: number;

    @IsObject()
    @IsOptional()
    config?: Record<string, any>;
}

export class CreateWorkflowDto {
    @IsString()
    name: string;

    @IsEnum(WorkflowTrigger)
    trigger: WorkflowTrigger;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => WorkflowActionDto)
    actions?: WorkflowActionDto[];
}
