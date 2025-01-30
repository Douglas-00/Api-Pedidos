import { Inject, Injectable } from '@nestjs/common';
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

  async execute(id: number): Promise<DeleteOrderResponseDto> {
    this.logger.log(`Deleting order with ID: ${id}`);
    await this.orderRepository.delete(id);
    return { message: 'Order deleted successfully' };
  }
}
