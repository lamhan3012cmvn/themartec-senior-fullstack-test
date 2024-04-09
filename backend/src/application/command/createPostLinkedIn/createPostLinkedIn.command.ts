import { ICommand } from '@nestjs/cqrs';
import { ImageEntity } from 'src/infrastructure/entities';
import { CreatePostLinkedInRequestDto } from 'src/interface/dto';

export type CreatePostLinkedInCommandPayload = {
  metaPost: CreatePostLinkedInRequestDto;
  gallery: ImageEntity[];
  author: string;
};

export class CreatePostLinkedInCommand implements ICommand {
  readonly payload: CreatePostLinkedInCommandPayload;

  constructor(payload: CreatePostLinkedInCommandPayload) {
    this.payload = payload;
  }
}
