import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  LoginLocalCommand,
  RefreshTokenCommand,
  RegisterLocalCommand,
} from 'src/application/command';
import { ResponseMessage } from 'src/application/decorators';
import { JwtAuthGuard } from 'src/infrastructure/strategies';
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/interface/dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getHello(@Request() req: any): Promise<string> {
    return req.user;
  }

  @Post('login')
  @ResponseMessage({
    [HttpStatus.CREATED]: 'Login success',
  })
  async login(@Body() payload: LoginRequestDto): Promise<LoginResponseDto> {
    const command = new LoginLocalCommand(payload.username, payload.password);
    return this.commandBus.execute(command);
  }

  @Post('register')
  @ResponseMessage({
    [HttpStatus.CREATED]: 'Register success',
  })
  async register(
    @Body() payload: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const command = new RegisterLocalCommand(payload);
    return this.commandBus.execute(command);
  }

  @Post('refresh-token')
  @ResponseMessage({
    [HttpStatus.CREATED]: 'Refresh token',
  })
  async refreshToken(
    @Body() payload: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const command = new RefreshTokenCommand(payload);
    return this.commandBus.execute(command);
  }
}
