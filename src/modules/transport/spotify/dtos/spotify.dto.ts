import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpotifyDto {
  @ApiProperty({ example: 'Rock', type: String })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({ example: 'http://', type: String })
  @IsNotEmpty()
  @IsString()
  public uri: string;
}
