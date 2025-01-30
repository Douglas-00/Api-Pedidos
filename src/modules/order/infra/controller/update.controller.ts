import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateOrderUseCase } from '../../application/useCases/update.useCase';
import { ORDER_RESOURCE } from './route';
import { UpdateOrderRequestDto } from '../dto/update/request.dto';
import { UpdateOrderResponseDto } from '../dto/update/response.dto';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class UpdateOrderController {
  constructor(private readonly useCase: UpdateOrderUseCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update order details' })
  async updateOrder(
    @Param('id') id: number,
    @Body() orderData: UpdateOrderRequestDto,
  ): Promise<UpdateOrderResponseDto> {
    return await this.useCase.execute(id, orderData);
  }
}
