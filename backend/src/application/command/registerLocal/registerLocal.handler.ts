import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { PASSWORD_GENERATOR, PasswordGenerator } from 'libs/password';
import { InjectModel } from 'nestjs-typegoose';
import { AuthEntity } from 'src/infrastructure/entities';
import { RegisterLocalCommand } from './registerLocal.command';
import { RegisterLocalResult } from './registerLocal.result';
import { EnvironmentConfigService } from 'libs/environment';

@CommandHandler(RegisterLocalCommand)
export class RegisterLocalHandler
  implements ICommandHandler<RegisterLocalCommand, RegisterLocalResult>
{
  @InjectModel(AuthEntity) private readonly authEntity: ReturnModelType<
    typeof AuthEntity
  >;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(PASSWORD_GENERATOR)
    private readonly passwordGenerator: PasswordGenerator,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async execute(command: RegisterLocalCommand): Promise<RegisterLocalResult> {
    const { username, email, password, confirmPassword } = command.payload;

    if (password !== confirmPassword) {
      throw new Error('Password does not match');
    }

    const hashedPassword = this.passwordGenerator.generateKey(password);

    const user = new this.authEntity({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = { _id: user._id, username: user.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.environmentConfigService.tokenSecret,
      expiresIn: this.environmentConfigService.tokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.environmentConfigService.tokenSecret,
      expiresIn: this.environmentConfigService.refreshTokenExpiresIn,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
