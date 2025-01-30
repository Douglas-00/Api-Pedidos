import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ProductMapper } from '../mappers/product.mapper';
import { ShowProductResponseDto } from '../../infra/dto/show/response.dto';

@Injectable()
export class ShowProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(productId: number): Promise<ShowProductResponseDto> {
    const verifyProduct = await this.productRepository.findById(productId);

    if (!verifyProduct) {
      this.logger.warn('Product not found');
      throw new BadRequestException('Product not found');
    }

    return ProductMapper.toResponseDto(verifyProduct);
  }
}
