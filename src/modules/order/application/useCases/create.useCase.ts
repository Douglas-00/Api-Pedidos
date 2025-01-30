import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { OrderMapper } from '../mappers/order.mapper';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(orderData: any): Promise<any> {
    return await this.orderRepository.create(OrderMapper.toDomain(orderData));
  }
}
