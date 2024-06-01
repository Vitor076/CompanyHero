import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherMapDto {
  @ApiProperty({ example: 'São Paulo', type: Object })
  @IsNotEmpty()
  public main: WeatherMap;
}

export class WeatherMap {
  @ApiProperty({ example: 18.7, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public temp: number;

  @ApiProperty({ example: 18.35, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public feels_like: number;

  @ApiProperty({ example: 17.42, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public temp_min: number;

  @ApiProperty({ example: 21.1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public temp_max: number;

  @ApiProperty({ example: 1028, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public pressure: number;

  @ApiProperty({ example: 66, type: Number })
  @IsNotEmpty()
  @IsNumber()
  public humidity: number;
}
