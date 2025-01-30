import {
  Controller,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UpdateProductRequestDto } from '../dto/update/request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PRODUCT_RESOURCE } from './route';
import { UpdateProductUseCase } from '../../application/useCases/update.useCase';
import { UpdateProductResponseDto } from '../dto/update/response.dto';

@ApiTags('Products')
@Controller(PRODUCT_RESOURCE)
export class UpdateProductController {
  constructor(private readonly useCase: UpdateProductUseCase) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Update product information',
    description: 'Updates a product’s details by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Product updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductRequestDto,
  ): Promise<UpdateProductResponseDto> {
    return await this.useCase.execute(id, updateProductDto);
  }
}
