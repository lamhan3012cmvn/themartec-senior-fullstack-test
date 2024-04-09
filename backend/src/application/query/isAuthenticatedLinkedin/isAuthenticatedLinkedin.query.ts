import { IQuery } from '@nestjs/cqrs';

export class IsAuthenticatedLinkedinQuery implements IQuery {
  constructor(readonly userId: string) {}
}
