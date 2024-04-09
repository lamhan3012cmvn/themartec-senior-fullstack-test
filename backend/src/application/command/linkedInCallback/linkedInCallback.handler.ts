import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReturnModelType } from '@typegoose/typegoose';
import { LinkedInPublicContent } from 'libs/integrationPublicContentSocial';
import { InjectModel } from 'nestjs-typegoose';
import { TokenLinkedEntity } from 'src/infrastructure/entities';
import { LinkedInCallbackCommand } from './linkedInCallback.command';
import { LinkedInCallbackResult } from './linkedInCallback.result';
@CommandHandler(LinkedInCallbackCommand)
export class LinkedInCallbackHandler
  implements ICommandHandler<LinkedInCallbackCommand, LinkedInCallbackResult>
{
  @InjectModel(TokenLinkedEntity)
  private readonly tokenLinkedEntity: ReturnModelType<typeof TokenLinkedEntity>;

  constructor(private readonly linkedInPublicContent: LinkedInPublicContent) {}

  async execute(
    command: LinkedInCallbackCommand,
  ): Promise<LinkedInCallbackResult> {
    const signalAuthenticatedLinked =
      await this.linkedInPublicContent.getAccessToken({
        code: command.code,
      });

    if (!signalAuthenticatedLinked) {
      throw new Error('Error get access token linkedin');
    }

    const {
      access_token,
      refresh_token,
      expires_in,
      refresh_token_expires_in,
      scope,
      id_token,
    } = signalAuthenticatedLinked;

    const userLinked = await this.linkedInPublicContent.getInformationByToken({
      token: access_token,
    });

    if (!userLinked) {
      throw new Error('Error get information linkedin');
    }

    const tokenLinked = await this.tokenLinkedEntity.create({
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresInAccessToken: expires_in,
      expiresInRefreshToken: refresh_token_expires_in,
      scope: scope,
      tokenId: id_token,
      userId: command.userId,
      linkedInId: userLinked.sub,
      linkedInName: userLinked.name,
    });

    await tokenLinked.save();

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }
}
