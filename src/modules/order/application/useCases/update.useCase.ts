import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { UpdateOrderRequestDto } from '../../infra/dto/update/request.dto';
import { UpdateOrderResponseDto } from '../../infra/dto/update/response.dto';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(
    id: number,
    orderData: UpdateOrderRequestDto,
    userId: number,
  ): Promise<UpdateOrderResponseDto> {
    this.logger.log(`Updating order with ID: ${id}`);

    const order = await this.orderRepository.findById(id, userId);

    if (!order) {
      this.logger.warn('Order not found');
      throw new BadRequestException('Order not found');
    }

    if (order.userId !== userId) {
      this.logger.warn(
        `User ${userId} tried to update order ${id} without permission`,
      );
      throw new ForbiddenException(
        'You do not have permission to update this order',
      );
    }

    await this.orderRepository.update(id, orderData, userId);

    return { id, message: 'Order updated successfully' };
  }
}
