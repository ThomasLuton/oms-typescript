import { Controller, HttpCode, HttpStatus, Post, Get, Body, Param } from "@nestjs/common";
import { OrderDto } from "./orders.dto";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async addOrder(@Body() input: OrderDto) {
        // TODO récupérer userId dynamiquement
        const userId = 1; 
        return await this.ordersService.create(userId, input);
    }

    @Get(':orderNumber')
    async getOrderByOrderNumber(@Param('orderNumber') orderNumber: string) {
        return await this.ordersService.getOrderbyOrderNumber(orderNumber);
    }
}