import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListOrdersUseCase } from '../../application/useCases/list.useCase';
import { ORDER_RESOURCE } from './route';
import { ListOrdersResponseDto } from '../dto/list/response.dto';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class ListOrdersController {
  constructor(private readonly useCase: ListOrdersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  async listOrders(): Promise<ListOrdersResponseDto[]> {
    return await this.useCase.execute();
  }
}
