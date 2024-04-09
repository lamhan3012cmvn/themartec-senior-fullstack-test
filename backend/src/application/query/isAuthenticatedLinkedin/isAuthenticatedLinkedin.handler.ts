import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TokenLinkedEntity } from 'src/infrastructure/entities';
import { IsAuthenticatedLinkedinQuery } from './isAuthenticatedLinkedin.query';
import { IsAuthenticatedLinkedinResult } from './isAuthenticatedLinkedin.result';

@QueryHandler(IsAuthenticatedLinkedinQuery)
export class IsAuthenticatedLinkedinHandler
  implements
    ICommandHandler<
      IsAuthenticatedLinkedinQuery,
      IsAuthenticatedLinkedinResult
    >
{
  @InjectModel(TokenLinkedEntity)
  private tokenLinkedEntity: ReturnModelType<typeof TokenLinkedEntity>;

  async execute(
    command: IsAuthenticatedLinkedinQuery,
  ): Promise<IsAuthenticatedLinkedinResult> {
    const { userId } = command;

    const signal = await this.tokenLinkedEntity
      .findOne({
        userId: userId,
      })
      .lean();

    const isAuthenticated = !!signal;

    return {
      isAuthenticated,
    };
  }
}
