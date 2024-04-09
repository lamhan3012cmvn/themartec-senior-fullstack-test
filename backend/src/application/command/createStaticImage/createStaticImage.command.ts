import { ICommand } from '@nestjs/cqrs';

export class CreateStaticImageCommand implements ICommand {
  constructor(
    readonly payload: {
      files: Array<{
        name: string;
        path: string;
      }>;
    },
  ) {}
}
