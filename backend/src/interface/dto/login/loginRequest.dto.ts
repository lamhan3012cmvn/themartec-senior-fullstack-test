import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'username',
    description: 'The email user wants to register with system',
  })
  readonly username: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The password of the user',
  })
  readonly password: string;
}
