import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserInput {
  @ApiProperty({ description: 'nome da cidade', example: 'São Paulo' })
  @IsString()
  cityName: string;
}
