import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { OrderMapper } from '../mappers/order.mapper';
import { CreateOrderRequestDto } from '../../infra/dto/create/request.dto';
import { CreateOrderResponseDto } from '../../infra/dto/create/response.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(
    orderData: CreateOrderRequestDto,
    userId: number,
  ): Promise<CreateOrderResponseDto> {
    const order = OrderMapper.toDomain(orderData, userId);

    const createdOrder = await this.orderRepository.create(order);
    console.log('pedido criar:', createdOrder);

    // if (createdOrder.status === 'COMPLETED') {
    //   await this.orderRepository.updateStockAfterOrderCompletion(
    //     createdOrder.id,
    //     userId,
    //   );
    // }

    return { id: order.id, message: 'Order created successfully' };
  }
}
