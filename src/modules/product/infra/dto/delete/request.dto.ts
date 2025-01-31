import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class DeleteProductIdRequestDto {
  @ApiProperty({ description: 'Id do produto', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
