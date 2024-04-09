import { PostEntity } from 'src/infrastructure/entities';

export class FindListPostByUserResult {
  constructor(readonly list: PostEntity[]) {}
}
