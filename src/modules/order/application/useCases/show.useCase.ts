import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { OrderMapper } from '../mappers/order.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';
import { Order } from '../domain/entities/order.entity';

@Injectable()
export class ShowOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(id: number, userId: number): Promise<Partial<Order>> {
    const order = await this.orderRepository.findById(id, userId);

    if (!order) {
      this.logger.warn('Order not found');
      throw new BadRequestException('Order not found');
    }

    if (order.userId !== userId) {
      this.logger.warn(
        `User ${userId} tried to access order ${id} without permission`,
      );
      throw new ForbiddenException(
        'You do not have permission to access this order',
      );
    }

    return OrderMapper.toResponseDto(order);
  }
}
