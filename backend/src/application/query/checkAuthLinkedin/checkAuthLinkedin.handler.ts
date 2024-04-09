import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TokenLinkedEntity } from 'src/infrastructure/entities';
import { CheckAuthLinkedinQuery } from './checkAuthLinkedin.query';
import { CheckAuthLinkedinResult } from './checkAuthLinkedin.result';
import { LinkedInPublicContent } from 'libs/integrationPublicContentSocial';

@QueryHandler(CheckAuthLinkedinQuery)
export class CheckAuthLinkedinHandler
  implements ICommandHandler<CheckAuthLinkedinQuery, CheckAuthLinkedinResult>
{
  @InjectModel(TokenLinkedEntity)
  private tokenLinkedEntity: ReturnModelType<typeof TokenLinkedEntity>;

  constructor(private linkedInPublicContent: LinkedInPublicContent) {}
  async execute(
    command: CheckAuthLinkedinQuery,
  ): Promise<CheckAuthLinkedinResult> {
    const { userId } = command;

    const signal = await this.tokenLinkedEntity
      .findOne({
        userId: userId,
      })
      .lean();

    const isAuthenticated = !!signal;
    let url: string = null;

    if (!isAuthenticated) {
      url = this.linkedInPublicContent.getAuthorization({
        userId,
      }).url;
    }

    return {
      isAuthenticated: !!signal,
      url: url,
    };
  }
}
