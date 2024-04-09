import { ICommand } from '@nestjs/cqrs';
import { RegisterRequestDto } from 'src/interface/dto';

export class RegisterLocalCommand implements ICommand {
  constructor(readonly payload: RegisterRequestDto) {}
}
