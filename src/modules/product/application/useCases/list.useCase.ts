import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { ProductMapper } from '../mappers/product.mapper';
import { ListProductResponseDto } from '../../infra/dto/list/response.dto';

@Injectable()
export class ListProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<ListProductResponseDto[]> {
    const products = await this.productRepository.list();
    return ProductMapper.toListResponseDto(products);
  }
}
