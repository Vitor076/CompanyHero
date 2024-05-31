import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserGeocodingDto {
  @ApiProperty({ example: 'São Paulo', type: String })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({ example: 'nome', type: String })
  @IsNotEmpty()
  @IsString()
  public local_names: object;

  @ApiProperty({ example: -26.545121, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public lat: number;

  @ApiProperty({ example: 65.5474121, type: Number })
  @IsNotEmpty()
  @IsString()
  public lon: number;

  @ApiProperty({ example: 'BR', type: String })
  @IsNotEmpty()
  @IsString()
  public country: string;

  @ApiProperty({ example: 'São Paulo', type: String })
  @IsNotEmpty()
  @IsString()
  public state: string;
}
