import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { OrderMapper } from '../mappers/order.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ShowOrderResponseDto } from '../../infra/dto/show/response.dto';

@Injectable()
export class ShowOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(id: number): Promise<ShowOrderResponseDto> {
    this.logger.log(`Fetching order with ID: ${id}`);
    const order = await this.orderRepository.findById(id);
    return order ? OrderMapper.toResponseDto(order) : null;
  }
}
