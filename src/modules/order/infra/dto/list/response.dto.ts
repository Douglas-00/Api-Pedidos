import { OrderStatus } from '@prisma/client';

export class ListOrdersResponseDto {
  id?: number;
  userId?: number;
  totalAmount?: number;
  status?: OrderStatus;
  createdAt?: Date;
}
