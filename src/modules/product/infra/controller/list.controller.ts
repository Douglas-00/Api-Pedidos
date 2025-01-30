import { Controller, Get } from '@nestjs/common';
import { ListProductResponseDto } from '../dto/list/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PRODUCT_RESOURCE } from './route';
import { ListProductUseCase } from '../../application/useCases/list.useCase';

@ApiTags('Products')
@Controller(PRODUCT_RESOURCE)
export class ListProductsController {
  constructor(private readonly useCase: ListProductUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'List all products',
    description: 'Fetches all products from the system.',
  })
  @ApiResponse({ status: 200, description: 'Products found.' })
  async listProducts(): Promise<ListProductResponseDto[]> {
    return await this.useCase.execute();
  }
}
