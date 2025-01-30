import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: number): Promise<Partial<Product> | null>;
  update(id: number, product: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<string>;
  list(): Promise<Partial<Product>[]>;
}
