import { ICommand } from '@nestjs/cqrs';
import { RefreshTokenRequestDto } from 'src/interface/dto';

export class RefreshTokenCommand implements ICommand {
  constructor(readonly payload: RefreshTokenRequestDto) {}
}
