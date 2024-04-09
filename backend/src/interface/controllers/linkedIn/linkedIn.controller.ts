import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LinkedInCallbackCommand } from 'src/application/command';
import { ResponseMessage } from 'src/application/decorators';
import {
  CheckAuthLinkedinQuery,
  IsAuthenticatedLinkedinQuery,
} from 'src/application/query';
import { JwtAuthGuard } from 'src/infrastructure/strategies';

@Controller('linkedIn')
export class LinkedInController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('is-authenticated')
  @ResponseMessage({
    [HttpStatus.OK]: 'Get authenticated linkedin success',
  })
  @UseGuards(JwtAuthGuard)
  async isAuthenticated(@Request() req: any): Promise<string> {
    const query = new IsAuthenticatedLinkedinQuery(req.user.userId);
    return this.queryBus.execute(query);
  }

  @Get('authenticated')
  @ResponseMessage({
    [HttpStatus.OK]: 'Get create link request linkedin success',
  })
  @UseGuards(JwtAuthGuard)
  async authenticated(@Request() req: any): Promise<string> {
    const query = new CheckAuthLinkedinQuery(req.user.userId);
    return this.queryBus.execute(query);
  }

  @Get('callback')
  @ResponseMessage({
    [HttpStatus.OK]: 'Callback linkedin success',
  })
  @UseGuards(JwtAuthGuard)
  async linkedInCallBack(@Query('code') code: string, @Request() req: any) {
    const command = new LinkedInCallbackCommand(code, req.user.userId);
    this.commandBus.execute(command);
  }
}
