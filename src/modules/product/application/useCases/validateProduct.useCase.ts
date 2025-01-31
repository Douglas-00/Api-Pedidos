import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ProductRepository } from 'src/modules/product/application/domain/repositories/product.repository';
import { Product } from 'src/modules/product/application/domain/entities/product.entity';

@Injectable()
export class ValidateProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async validate(
    productId: number,
    quantity: number,
  ): Promise<Partial<Product>> {
    if (quantity <= 0) {
      throw new BadRequestException(
        'A quantidade do produto deve ser maior que zero.',
      );
    }

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException(
        `Produto com ID ${productId} não encontrado.`,
      );
    }

    if (product.stockQuantity < quantity) {
      throw new BadRequestException(
        `Estoque insuficiente para o produto ${product.name}. Disponível: ${product.stockQuantity}, Solicitado: ${quantity}`,
      );
    }

    return product;
  }

  async updateStock(
    productId: number,
    newStockQuantity: number,
  ): Promise<Product> {
    return await this.productRepository.update(productId, {
      stockQuantity: newStockQuantity,
    });
  }
}
