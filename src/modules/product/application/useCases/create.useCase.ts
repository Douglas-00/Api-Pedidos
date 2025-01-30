import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { ProductMapper } from '../mappers/product.mapper';
import { CreateProductRequestDto } from '../../infra/dto/create/request.dto';
import { CreateProductResponseDto } from '../../infra/dto/create/response.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductPrismaRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    payload: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    const product = ProductMapper.toDomain(payload);
    const newProduct = await this.productRepository.create(product);
    return { id: newProduct.id, message: 'Product created successfully' };
  }
}
