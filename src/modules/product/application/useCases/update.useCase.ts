import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(productId: number, updateProductDto: any): Promise<any> {
    const verifyProduct = await this.productRepository.findById(productId);

    if (!verifyProduct) {
      this.logger.warn('Product not found');
      throw new BadRequestException('Product not found');
    }

    const updatedProduct = await this.productRepository.update(
      productId,
      updateProductDto,
    );
    return ProductMapper.toUpdateResponseDto(updatedProduct);
  }
}
