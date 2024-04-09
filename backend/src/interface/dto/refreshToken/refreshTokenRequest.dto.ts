import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class RefreshTokenRequestDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'refreshToken',
    description: 'The refreshToken using to get a new access token',
  })
  readonly refreshToken: string;
}
