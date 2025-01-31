import { OrderStatus } from '@prisma/client';

export class ListOrdersResponseDto {
  id?: number;
  userId?: number;
  totalAmount?: number;
  status?: OrderStatus;
  products?: {
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      stockQuantity: number;
    };
  }[];
}
