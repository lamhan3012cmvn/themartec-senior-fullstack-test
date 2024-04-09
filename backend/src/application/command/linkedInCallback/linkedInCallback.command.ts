import { ICommand } from '@nestjs/cqrs';

export class LinkedInCallbackCommand implements ICommand {
  constructor(
    readonly code: string,
    readonly userId: string,
  ) {}
}
