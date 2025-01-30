import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteOrderUseCase } from '../../application/useCases/delete.useCase';
import { ORDER_RESOURCE } from './route';
import { DeleteOrderResponseDto } from '../dto/delete/response.dto';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class DeleteOrderController {
  constructor(private readonly useCase: DeleteOrderUseCase) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  async deleteOrder(@Param('id') id: number): Promise<DeleteOrderResponseDto> {
    return await this.useCase.execute(id);
  }
}
