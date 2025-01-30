import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderRequestDto {
  @ApiProperty({ description: 'User ID for the order', example: 1 })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: 'Total amount of the order in cents',
    example: 15000,
  })
  @IsInt()
  @Min(0)
  totalAmount: number;

  @ApiProperty({
    description: 'List of products with quantity',
    example: [{ productId: 1, quantity: 2 }],
  })
  @IsNotEmpty()
  products: { productId: number; quantity: number }[];
}
