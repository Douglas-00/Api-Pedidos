import { OrderStatus } from '@prisma/client';

export interface Order {
  id?: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  products?: {
    productId: number;
    quantity: number;
  }[];
}
