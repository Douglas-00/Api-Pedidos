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
    const order = await this.prisma.order.findUnique({
      where: { id, userId, deletedAt: null },
      include: {
        products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stockQuantity: true,
              },
            },
          },
        },
      },
    });

    const transformedOrder = {
      ...order,
      products: order.products.map((orderProduct) => {
        const product = orderProduct.product;

        const formattedPrice = (product.price / 100)
          .toFixed(2)
          .replace('.', ',');

        return {
          ...product,
          price: `R$ ${formattedPrice}`,
        };
      }),
    };

    return transformedOrder as any;
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
    const orders = await this.prisma.order.findMany({
      where: { userId, deletedAt: null },
      select: {
        id: true,
        userId: true,
        totalAmount: true,
        status: true,
        products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stockQuantity: true,
              },
            },
          },
        },
      },
    });

    return orders.map(
      (order) =>
        ({
          ...order,
          products: order.products.map((orderProduct) => {
            const product = orderProduct.product;

            const formattedPrice = (product.price / 100)
              .toFixed(2)
              .replace('.', ',');

            return {
              ...product,
              price: `R$ ${formattedPrice}`,
            };
          }),
        }) as any,
    );
  }
}
