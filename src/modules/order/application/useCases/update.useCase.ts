import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
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
  ): Promise<UpdateOrderResponseDto> {
    this.logger.log(`Updating order with ID: ${id}`);
    await this.orderRepository.update(id, orderData);
    return { id, message: 'Order updated successfully' };
  }
}
