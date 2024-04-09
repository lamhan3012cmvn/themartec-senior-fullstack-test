import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreatePostLinkedInRequestDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'title',
    description: 'The title of the post',
  })
  readonly title: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'content',
    description: 'The content of the post',
  })
  readonly content: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'gallery',
    description: 'The gallery of the post',
  })
  readonly gallery: string;
}
