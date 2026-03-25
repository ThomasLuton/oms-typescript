import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrdersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: {
        userId: number;
        nom: string;
        description: string;
        prix: number;
    }) {
        return this.prisma.order.create({
            data,
        });
    }

    async findAllByUserId(userId: number) {
        return this.prisma.order.findMany({
            where: { userId },
        });
    }

    async findOne(id: number) {
        return this.prisma.order.findUnique({
            where: { id },
        });
    }

    async findOneByOrderNumber(orderNumber: string) {
        return this.prisma.order.findUnique({
            where: { orderNumber },
        });
    }
}