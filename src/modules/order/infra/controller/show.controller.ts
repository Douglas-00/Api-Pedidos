import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShowOrderUseCase } from '../../application/useCases/show.useCase';
import { ORDER_RESOURCE } from './route';
import { ShowOrderResponseDto } from '../dto/show/response.dto';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class ShowOrderController {
  constructor(private readonly useCase: ShowOrderUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  async showOrder(@Param('id') id: number): Promise<ShowOrderResponseDto> {
    return await this.useCase.execute(id);
  }
}
