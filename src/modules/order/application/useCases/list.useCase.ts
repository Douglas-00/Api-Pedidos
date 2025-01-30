import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { OrderMapper } from '../mappers/order.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ListOrdersResponseDto } from '../../infra/dto/list/response.dto';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(): Promise<ListOrdersResponseDto[]> {
    this.logger.log('Fetching all orders');
    const orders = await this.orderRepository.list();
    return orders.map(OrderMapper.toResponseDto);
  }
}
