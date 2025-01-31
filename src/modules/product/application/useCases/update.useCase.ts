import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ProductMapper } from '../mappers/product.mapper';
import { UpdateProductRequestDto } from '../../infra/dto/update/request.dto';
import { UpdateProductResponseDto } from '../../infra/dto/update/response.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
    private readonly logger: AppLogger,
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    productId: number,
    updateProductDto: UpdateProductRequestDto,
  ): Promise<UpdateProductResponseDto> {
    return await this.prisma.$transaction(async () => {
      const verifyProduct = await this.productRepository.findById(productId);

      if (!verifyProduct) {
        this.logger.warn('Product not found');
        throw new BadRequestException('Product not found');
      }

      const product = await ProductMapper.toDomainUpdate(updateProductDto);

      const updatedProduct = await this.productRepository.update(
        productId,
        product,
      );

      return ProductMapper.toUpdateResponseDto(updatedProduct);
    });
  }
}
