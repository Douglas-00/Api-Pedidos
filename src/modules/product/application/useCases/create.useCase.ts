import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { ProductMapper } from '../mappers/product.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(payload: any): Promise<any> {
    const product = ProductMapper.toDomain(payload);
    const newProduct = await this.productRepository.create(product);
    return { id: newProduct.id, message: 'Product created successfully' };
  }
}
