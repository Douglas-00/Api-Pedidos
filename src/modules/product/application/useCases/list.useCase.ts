import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ListProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(): Promise<any[]> {
    const products = await this.productRepository.list();
    return ProductMapper.toListResponseDto(products);
  }
}
