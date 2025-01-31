import {
  Controller,
  Post,
  Body,
  Req,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/useCases/create.useCase';
import { ORDER_RESOURCE } from './route';
import { CreateOrderRequestDto } from '../dto/create/request.dto';
import { CreateOrderResponseDto } from '../dto/create/response.dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class CreateOrderController {
  constructor(private readonly useCase: CreateOrderUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async createOrder(
    @Body() orderData: CreateOrderRequestDto,
    @Req() request: any,
  ): Promise<CreateOrderResponseDto> {
    const userId = request.user?.sub;

    return await this.useCase.execute(orderData, userId);
  }
}
