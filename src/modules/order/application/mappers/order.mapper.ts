import { CreateOrderRequestDto } from '../../infra/dto/create/request.dto';
import { Order } from '../domain/entities/order.entity';

export class OrderMapper {
  static toDomain(payload: CreateOrderRequestDto, userId: number): Order {
    return {
      userId: userId,
      totalAmount: payload.totalAmount,
      status: 'PENDING',
      products: payload.products,
    };
  }

  static toResponseDto(order: Partial<Order>): Partial<Order> {
    return {
      id: order.id,
      userId: order?.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
