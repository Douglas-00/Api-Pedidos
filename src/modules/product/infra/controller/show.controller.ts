import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShowProductResponseDto } from '../dto/show/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PRODUCT_RESOURCE } from './route';
import { ShowProductUseCase } from '../../application/useCases/show.useCase';
import { ShowProductIdRequestDto } from '../dto/show/request.dto';

@ApiTags('Products')
@Controller(PRODUCT_RESOURCE)
export class ShowProductController {
  constructor(private readonly useCase: ShowProductUseCase) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Show product details',
    description: 'Fetches the details of a specific product by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async showProduct(
    @Param() { id }: ShowProductIdRequestDto,
  ): Promise<ShowProductResponseDto> {
    return await this.useCase.execute(id);
  }
}
