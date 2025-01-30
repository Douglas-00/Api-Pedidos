import { Product } from '../domain/entities/product.entity';

export class ProductMapper {
  static toDomain(payload: any): Product {
    return new Product(
      payload.id,
      payload.name,
      payload.category,
      payload.description,
      payload.price,
      payload.stockQuantity,
    );
  }

  static toListResponseDto(products: Partial<Product>[]): any[] {
    return (
      products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stockQuantity: product.stockQuantity,
      })) || []
    );
  }

  static toShowResponseDto(product: Partial<Product>): any {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
    };
  }

  static toUpdateResponseDto(product: Product): any {
    return {
      id: product.id,
      message: 'Product updated successfully',
    };
  }
}
