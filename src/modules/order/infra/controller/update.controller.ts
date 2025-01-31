import {
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateOrderUseCase } from '../../application/useCases/update.useCase';
import { ORDER_RESOURCE } from './route';
import {
  UpdateOrderIdRequestDto,
  UpdateOrderRequestDto,
} from '../dto/update/request.dto';
import { UpdateOrderResponseDto } from '../dto/update/response.dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class UpdateOrderController {
  constructor(private readonly useCase: UpdateOrderUseCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update order details' })
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async updateOrder(
    @Param() { id }: UpdateOrderIdRequestDto,
    @Req() request: any,
    @Body() orderData: UpdateOrderRequestDto,
  ): Promise<UpdateOrderResponseDto> {
    const userId = request.user?.sub;
    return await this.useCase.execute(id, orderData, userId);
  }
}
