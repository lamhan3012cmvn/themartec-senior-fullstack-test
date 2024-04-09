import { ImageEntity } from 'src/infrastructure/entities';

export class CreateStaticImageResult {
  constructor(readonly images: ImageEntity[]) {}
}
