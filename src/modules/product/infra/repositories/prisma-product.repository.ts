import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../application/domain/repositories/product.repository';
import { PrismaService } from 'src/db/prisma.service';
import { Product } from '../../application/domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    return await this.prisma.product.create({ data: product });
  }

  async findById(id: number): Promise<Partial<Product> | null> {
    return await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        stockQuantity: true,
      },
    });
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    return await this.prisma.product.update({
      where: { id, deletedAt: null },
      data: product,
    });
  }

  async delete(id: number): Promise<any> {
    return await this.prisma.product.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  async list(): Promise<Partial<Product>[]> {
    return (
      (await this.prisma.product.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          name: true,
          category: true,
          price: true,
          stockQuantity: true,
        },
        orderBy: { createdAt: 'desc' },
      })) || []
    );
  }
}
