import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'username',
    description: 'The username or email of the user',
  })
  readonly username: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The password of the user',
  })
  readonly password: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The confirmPassword of the user',
  })
  readonly confirmPassword: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'lamhan3012@gmail.com',
    description: 'The email of the user',
  })
  readonly email: string;
}
