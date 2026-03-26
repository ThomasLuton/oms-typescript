import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { OrderDto } from "./orders.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository, private readonly eventEmitter: EventEmitter2) { }

    async create(userId: number, input: OrderDto) {
        const order = await this.ordersRepository.create({
            userId,
            nom: input.nom,
            description: input.description,
            prix: input.prix
        });

        this.eventEmitter.emit("order.created", {
            userId: userId,
            log: "Order created"
        })

        return order;
    }

    async getUserOrders(userId: number) {
        return this.ordersRepository.findAllByUserId(userId);
    }

    async getOrderById(id: number) {
        const order = await this.ordersRepository.findOne(id);

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return order;
    }

    async getOrderbyOrderNumber(orderNumber: string) {
        const order = await this.ordersRepository.findOneByOrderNumber(orderNumber);

        if (!order) {
            throw new NotFoundException(`Order with order number ${orderNumber} not found`);
        }

        return order;
    }
}