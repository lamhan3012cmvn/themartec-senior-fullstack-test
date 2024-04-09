import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { PostEntity } from 'src/infrastructure/entities';
import { FindListPostByUserQuery } from './findListPostByUser.query';
import { FindListPostByUserResult } from './findListPostByUser.result';

@QueryHandler(FindListPostByUserQuery)
export class FindListPostByUserHandler
  implements ICommandHandler<FindListPostByUserQuery, FindListPostByUserResult>
{
  @InjectModel(PostEntity) private postEntity: ReturnModelType<
    typeof PostEntity
  >;
  async execute(
    command: FindListPostByUserQuery,
  ): Promise<FindListPostByUserResult> {
    const { userId } = command;

    const signalList = await this.postEntity
      .find({
        author: userId,
      })
      .populate('gallery')
      .lean();

    return {
      list: signalList,
    };
  }
}
