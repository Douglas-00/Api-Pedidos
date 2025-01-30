import { Order } from '../domain/entities/order.entity';

export class OrderMapper {
  static toDomain(payload: any): Order {
    return new Order(
      payload.id,
      payload.userId,
      payload.totalAmount,
      payload.status,
      payload.products,
    );
  }

  static toResponseDto(order: Order): any {
    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
