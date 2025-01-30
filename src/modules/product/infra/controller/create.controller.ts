import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PRODUCT_RESOURCE } from './route';
import { CreateProductUseCase } from '../../application/useCases/create.useCase';
import { CreateProductRequestDto } from '../dto/create/request.dto';
import { CreateProductResponseDto } from '../dto/create/response.dto';

@ApiTags('Products')
@Controller(PRODUCT_RESOURCE)
export class CreateProductController {
  constructor(private readonly useCase: CreateProductUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Creates a new product with the provided data.',
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    return await this.useCase.execute(createProductDto);
  }
}
