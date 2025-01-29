import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ShowUserRequestDto {
  @ApiProperty({ description: 'Id do usuário', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
