import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../domain/repositories/order.repository';
import { OrderMapper } from '../mappers/order.mapper';
import { CreateOrderRequestDto } from '../../infra/dto/create/request.dto';
import { CreateOrderResponseDto } from '../../infra/dto/create/response.dto';
import { ValidateProductUseCase } from 'src/modules/product/application/useCases/validateProduct.useCase';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrderPrismaRepository')
    private readonly orderRepository: OrderRepository,

    private readonly validateProductUseCase: ValidateProductUseCase,
    private readonly prisma: PrismaService, // Adicionado para transações
  ) {}

  async execute(
    orderData: CreateOrderRequestDto,
    userId: number,
  ): Promise<CreateOrderResponseDto> {
    const order = OrderMapper.toDomain(orderData, userId);

    return await this.prisma.$transaction(async () => {
      for (const item of order.products) {
        const product = await this.validateProductUseCase.validate(
          item.productId,
          item.quantity,
        );

        await this.validateProductUseCase.updateStock(
          product.id,
          product.stockQuantity - item.quantity,
        );
      }

      const createdOrder = await this.orderRepository.create(order);

      return {
        id: createdOrder.id,
        message: 'Order created successfully',
      };
    });
  }
}
