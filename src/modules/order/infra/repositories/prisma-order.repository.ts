import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/domain/repositories/order.repository';
import { PrismaService } from 'src/db/prisma.service';
import { Order } from '../../application/domain/entities/order.entity';
import { UpdateOrderRequestDto } from '../dto/update/request.dto';
import { ListOrdersResponseDto } from '../dto/list/response.dto';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = await this.prisma.order.create({
      data: {
        userId: order.userId,
        totalAmount: order.totalAmount,
        status: 'PENDING',
        products: {
          createMany: {
            data: order.products.map((p) => ({
              productId: p.productId,
              quantity: p.quantity,
            })),
          },
        },
      },
      include: {
        products: true,
      },
    });

    return createdOrder;
  }

  async findById(id: number, userId: number): Promise<Order | null> {
    return await this.prisma.order.findUnique({
      where: { id, userId, deletedAt: null },
      include: {
        products: true,
      },
    });
  }

  async update(
    id: number,
    order: UpdateOrderRequestDto,
    userId: number,
  ): Promise<Order> {
    return await this.prisma.order.update({
      where: { id, userId },
      data: {
        status: order.status,
      },
      include: {
        products: true,
      },
    });
  }

  async delete(id: number, userId: number): Promise<string> {
    await this.prisma.order.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
    return 'Order deleted successfully';
  }

  async list(userId: number): Promise<ListOrdersResponseDto[]> {
    return await this.prisma.order.findMany({
      where: { userId, deletedAt: null },
      select: {
        id: true,
        userId: true,
        totalAmount: true,
        status: true,
        createdAt: true,
      },
    });
  }
}
