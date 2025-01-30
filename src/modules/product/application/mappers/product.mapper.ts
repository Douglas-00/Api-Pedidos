import { Product } from '../domain/entities/product.entity';
import { CreateProductRequestDto } from '../../infra/dto/create/request.dto';
import { UpdateProductRequestDto } from '../../infra/dto/update/request.dto';

export class ProductMapper {
  private static toCents(price: number): number {
    return Math.ceil(price * 100);
  }

  private static toReais(price: number): number {
    return price / 100;
  }

  static toDomain(payload: CreateProductRequestDto): Product {
    return {
      name: payload.name,
      category: payload.category,
      description: payload.description,
      price: this.toCents(payload.price),
      stockQuantity: payload.stockQuantity,
    };
  }

  static toDomainUpdate(payload: UpdateProductRequestDto): Product {
    return {
      name: payload.name,
      category: payload.category,
      description: payload.description,
      price: this.toCents(payload.price),
      stockQuantity: payload.stockQuantity,
    };
  }

  static toResponseDto(product: Partial<Product>): Partial<Product> {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: this.toReais(product.price),
      stockQuantity: product.stockQuantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toListResponseDto(products: Partial<Product>[]): Partial<Product>[] {
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: this.toReais(product.price),
      stockQuantity: product.stockQuantity,
      createdAt: product.createdAt,
    }));
  }

  static toUpdateResponseDto(product: Product): any {
    return {
      id: product.id,
      message: 'Product updated successfully',
    };
  }
}
