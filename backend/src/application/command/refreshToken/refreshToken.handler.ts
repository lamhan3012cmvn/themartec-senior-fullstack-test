import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthEntity, TokenEntity } from 'src/infrastructure/entities';
import { RefreshTokenCommand } from './refreshToken.command';
import { RefreshTokenResult } from './refreshToken.result';
import { EnvironmentConfigService } from 'libs/environment';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand, RefreshTokenResult>
{
  @InjectModel(TokenEntity) private readonly tokenEntity: ReturnModelType<
    typeof TokenEntity
  >;

  @InjectModel(AuthEntity) private readonly authEntity: ReturnModelType<
    typeof AuthEntity
  >;

  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<RefreshTokenResult> {
    const token = await this.tokenEntity
      .findOne({
        refreshToken: command.payload.refreshToken,
      })
      .exec();

    if (!token) {
      throw new Error('Token not found');
    }

    if (token.refreshTokenUsed.includes(command.payload.refreshToken)) {
      throw new Error('Token already used');
    }

    const oldAccessToken = token.accessToken;
    const oldRefreshToken = token.refreshToken;

    const user = await this.authEntity
      .findById(new mongoose.Types.ObjectId(token.userId))
      .exec();

    const payload = { _id: user._id, username: user.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.environmentConfigService.tokenSecret,
      expiresIn: this.environmentConfigService.tokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.environmentConfigService.tokenSecret,
      expiresIn: this.environmentConfigService.refreshTokenExpiresIn,
    });

    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    token.accessTokenUsed.push(oldAccessToken);
    token.refreshTokenUsed.push(oldRefreshToken);

    await token.save();

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
