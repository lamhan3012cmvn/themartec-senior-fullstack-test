import { IQuery } from '@nestjs/cqrs';

export class FindListPostByUserQuery implements IQuery {
  constructor(readonly userId: string) {}
}
