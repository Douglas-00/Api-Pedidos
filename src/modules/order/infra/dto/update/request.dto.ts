import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateOrderRequestDto {
  @ApiProperty({
    description: 'Status of the order',
    example: OrderStatus.COMPLETED,
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  @IsOptional()
  status?: OrderStatus;
}
export class UpdateOrderIdRequestDto {
  @ApiProperty({ description: 'Id do pedido', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
