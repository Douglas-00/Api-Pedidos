import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/useCases/create.useCase';
import { ORDER_RESOURCE } from './route';
import { CreateOrderRequestDto } from '../dto/create/request.dto';
import { CreateOrderResponseDto } from '../dto/create/response.dto';
@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class CreateOrderController {
  constructor(private readonly useCase: CreateOrderUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(
    @Body() orderData: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    return await this.useCase.execute(orderData);
  }
}
