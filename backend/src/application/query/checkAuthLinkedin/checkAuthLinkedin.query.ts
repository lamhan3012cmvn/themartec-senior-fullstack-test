import { IQuery } from '@nestjs/cqrs';

export class CheckAuthLinkedinQuery implements IQuery {
  constructor(readonly userId: string) {}
}
