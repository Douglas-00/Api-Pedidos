import {
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { DeleteOrderUseCase } from '../../application/useCases/delete.useCase';
import { ORDER_RESOURCE } from './route';
import { DeleteOrderResponseDto } from '../dto/delete/response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { DeleteOrderIdRequestDto } from '../dto/delete/request.dto';

@ApiTags('Orders')
@Controller(ORDER_RESOURCE)
export class DeleteOrderController {
  constructor(private readonly useCase: DeleteOrderUseCase) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async deleteOrder(
    @Param() { id }: DeleteOrderIdRequestDto,
    @Req() request: any,
  ): Promise<DeleteOrderResponseDto> {
    const userId = request.user?.sub;
    return await this.useCase.execute(id, userId);
  }
}
