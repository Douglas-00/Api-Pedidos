import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ShowOrderIdRequestDto {
  @ApiProperty({ description: 'Id do pedido', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
