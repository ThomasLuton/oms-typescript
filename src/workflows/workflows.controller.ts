import { Controller, UseGuards, Body, Request, Post, Get, Param } from "@nestjs/common";
import { JwtGuard } from "src/auth/auth.guard";
import { WorkflowsService } from "./workflows.service";
import { CreateWorkflowDto } from "./workflows.dto";

@UseGuards(JwtGuard)
@Controller('workflows')
export class WorkflowsController {
    constructor(private readonly workflowsService: WorkflowsService) { }

    @Post()
    async create(@Body() dto: CreateWorkflowDto, @Request() req) {
        const userId = req.user.id;
        return this.workflowsService.create(userId, dto);
    }

    @Get()
    async findAll(@Request() req) {
        const userId = req.user.id;
        return this.workflowsService.findAllByUser(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Request() req) {
        const userId = req.user.id;
        return this.workflowsService.findById(id, userId);
    }
}
