import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  PASSWORD_GENERATOR,
  PasswordGenerator,
} from 'libs/password/password.module';
import { InjectModel } from 'nestjs-typegoose';
import { AuthEntity, TokenEntity } from 'src/infrastructure/entities';
import { LoginLocalCommand } from './loginLocal.command';
import { LoginLocalResult } from './loginLocal.result';
import { EnvironmentConfigService } from 'libs/environment';
@CommandHandler(LoginLocalCommand)
export class LoginLocalHandler
  implements ICommandHandler<LoginLocalCommand, LoginLocalResult>
{
  @InjectModel(AuthEntity) private readonly authEntity: ReturnModelType<
    typeof AuthEntity
  >;
  @InjectModel(TokenEntity) private readonly tokenEntity: ReturnModelType<
    typeof TokenEntity
  >;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(PASSWORD_GENERATOR)
    private readonly passwordGenerator: PasswordGenerator,

    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async execute(command: LoginLocalCommand): Promise<LoginLocalResult> {
    const { username, password } = command;

    const user = await this.authEntity
      .findOne({
        username: username,
      })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = this.passwordGenerator.compareKey(password, user.password);
    if (!isValid) {
      throw new Error('Password is incorrect');
    }

    const isExistToken = await this.tokenEntity.findOne({
      userId: user._id.toString(),
    });

    const payload = { _id: user._id, username: user.username };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.environmentConfigService.tokenSecret,
      expiresIn: this.environmentConfigService.tokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.environmentConfigService.tokenSecret,
      expiresIn: this.environmentConfigService.refreshTokenExpiresIn,
    });

    if (isExistToken) {
      await this.tokenEntity.deleteOne({
        userId: user._id.toString(),
      });
    }

    const token = new this.tokenEntity({
      accessToken,
      refreshToken,
      userId: user._id,
    });

    await token.save();

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }
}
