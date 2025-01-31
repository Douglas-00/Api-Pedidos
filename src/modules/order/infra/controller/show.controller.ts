import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ShowOrderUseCase } from '../../application/useCases/show.useCase';
import { ORDER_RESOURCE } from './route';
import { ShowOrderResponseDto } from '../dto/show/response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ShowOrderIdRequestDto } from '../dto/show/request.dto';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class ShowOrderController {
  constructor(private readonly useCase: ShowOrderUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  @ApiResponse({
    status: 200,
    description: 'Order details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async showOrder(
    @Param() { id }: ShowOrderIdRequestDto,
    @Req() request: any,
  ): Promise<ShowOrderResponseDto> {
    const userId = request.user?.sub;
    return await this.useCase.execute(id, userId);
  }
}
