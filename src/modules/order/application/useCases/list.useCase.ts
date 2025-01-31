import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ListOrdersResponseDto } from '../../infra/dto/list/response.dto';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(userId: number): Promise<ListOrdersResponseDto[]> {
    this.logger.log(`Fetching orders for user ${userId}`);

    const orders = await this.orderRepository.list(userId);
    return orders;
  }
}
