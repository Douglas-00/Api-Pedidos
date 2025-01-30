import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(productId: number): Promise<any> {
    const verifyProduct = await this.productRepository.findById(productId);

    if (!verifyProduct) {
      this.logger.warn('Product not found');
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.delete(productId);
    return { message: 'Product deleted successfully' };
  }
}
