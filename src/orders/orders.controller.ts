import { Controller, HttpCode, HttpStatus, Post, Get, Body, Param, UseGuards, Request } from "@nestjs/common";
import { OrderDto } from "./orders.dto";
import { OrdersService } from "./orders.service";
import { JwtGuard } from "src/auth/auth.guard";

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async addOrder(@Body() input: OrderDto, @Request() req) {
    const userId = req.user.id;
    return await this.ordersService.create(userId, input);
  }

  @Get(':orderNumber')
  async getOrderByOrderNumber(@Param('orderNumber') orderNumber: string) {
    return await this.ordersService.getOrderbyOrderNumber(orderNumber);
  }
}