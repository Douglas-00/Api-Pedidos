import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/domain/repositories/user.repository';
import { PrismaService } from 'src/db/prisma.service';
import { User } from '../../application/domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findById(id: number): Promise<Partial<User>> {
    return await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async update(userId: number, user: Partial<User>): Promise<any> {
    return await this.prisma.user.update({ where: { id: userId }, data: user });
  }

  async delete(id: number): Promise<any> {
    return await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  async list(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
