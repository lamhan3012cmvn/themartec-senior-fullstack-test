import { ICommand } from '@nestjs/cqrs';

export class LoginLocalCommand implements ICommand {
  constructor(
    readonly username: string,
    readonly password: string,
  ) {}
}
