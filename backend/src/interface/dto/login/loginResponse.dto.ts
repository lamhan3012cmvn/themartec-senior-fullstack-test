import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginResponseDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'access_token',
    description: 'The access token to authenticate the user',
  })
  readonly token: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'refresh_token',
    description: 'The refresh token when the access token expires',
  })
  readonly refreshToken: string;
}
