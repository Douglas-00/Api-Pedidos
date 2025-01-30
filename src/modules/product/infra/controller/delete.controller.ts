import {
  Controller,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PRODUCT_RESOURCE } from './route';
import { DeleteProductResponseDto } from '../dto/delete/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteProductUseCase } from '../../application/useCases/delete.useCase';

@ApiTags('Products')
@Controller(PRODUCT_RESOURCE)
export class DeleteProductController {
  constructor(private readonly useCase: DeleteProductUseCase) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Deletes a product by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<DeleteProductResponseDto> {
    return await this.useCase.execute(id);
  }
}
