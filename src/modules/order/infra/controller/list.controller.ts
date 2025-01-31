import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ListOrdersUseCase } from '../../application/useCases/list.useCase';
import { ORDER_RESOURCE } from './route';
import { ListOrdersResponseDto } from '../dto/list/response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class ListOrdersController {
  constructor(private readonly useCase: ListOrdersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async listOrders(@Req() request: any): Promise<ListOrdersResponseDto[]> {
    const userId = request.user?.sub;
    return await this.useCase.execute(userId);
  }
}
