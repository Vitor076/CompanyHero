import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @IsOptional()
  PORT?: number;

  @IsString()
  OPEN_WEATHER_GEOCODING_URL: string;

  @IsString()
  OPEN_WEATHER_KEY: string;

  @IsString()
  OPEN_WEATHER_MAP_URL: string;
}
