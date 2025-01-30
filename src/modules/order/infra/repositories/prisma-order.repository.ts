import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/domain/repositories/order.repository';
import { PrismaService } from 'src/db/prisma.service';
import { Order } from '../../application/domain/entities/order.entity';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    return await this.prisma.order.create({ data: order });
  }

  async findById(id: number): Promise<Order | null> {
    return await this.prisma.order.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    return await this.prisma.order.update({ where: { id }, data: order });
  }

  async delete(id: number): Promise<string> {
    await this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return 'Order deleted successfully';
  }

  async list(): Promise<Order[]> {
    return await this.prisma.order.findMany({ where: { deletedAt: null } });
  }
}
