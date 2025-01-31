import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { DeleteOrderResponseDto } from '../../infra/dto/delete/response.dto';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(id: number, userId: number): Promise<DeleteOrderResponseDto> {
    const order = await this.orderRepository.findById(id, userId);
    console.log(order);

    if (!order) {
      this.logger.warn('Order not found');
      throw new BadRequestException('Order not found');
    }

    if (order.userId !== userId) {
      this.logger.warn(
        `User ${userId} tried to delete order ${id} without permission`,
      );
      throw new ForbiddenException(
        'You do not have permission to delete this order',
      );
    }

    await this.orderRepository.delete(id, userId);
    return { message: 'Order deleted successfully' };
  }
}
