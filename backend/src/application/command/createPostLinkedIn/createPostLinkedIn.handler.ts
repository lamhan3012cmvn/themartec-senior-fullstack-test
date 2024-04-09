import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReturnModelType } from '@typegoose/typegoose';
import { LinkedInPublicContent } from 'libs/integrationPublicContentSocial';
import { InjectModel } from 'nestjs-typegoose';
import { PostEntity, TokenLinkedEntity } from 'src/infrastructure/entities';
import { CreatePostLinkedInCommand } from './createPostLinkedIn.command';
import { CreatePostLinkedInResult } from './createPostLinkedIn.result';

@CommandHandler(CreatePostLinkedInCommand)
export class CreatePostLinkedInHandler
  implements
    ICommandHandler<CreatePostLinkedInCommand, CreatePostLinkedInResult>
{
  @InjectModel(TokenLinkedEntity)
  private tokenLinkedEntity: ReturnModelType<typeof TokenLinkedEntity>;

  @InjectModel(PostEntity) private postEntity: ReturnModelType<
    typeof PostEntity
  >;
  constructor(private linkedInPublicContent: LinkedInPublicContent) {}

  private async getTokenLinkedIn({ userId }: { userId: string }) {
    const signalToken = await this.tokenLinkedEntity
      .findOne({
        userId: userId,
      })
      .lean();

    return signalToken;
  }

  async execute(
    command: CreatePostLinkedInCommand,
  ): Promise<CreatePostLinkedInResult> {
    const { metaPost, gallery, author } = command.payload;

    const signalCreate = await this.postEntity.create({
      title: metaPost.title,
      author: author,
      content: metaPost.content,
      gallery: gallery.map((image) => image._id),
      status: 'PENDING',
    });

    const tokenLinkedIn = await this.getTokenLinkedIn({ userId: author });
    if (!tokenLinkedIn) {
      throw new Error('Token not found');
    }

    const { accessToken, linkedInId } = tokenLinkedIn;

    const payloadRequest = {
      idAuthor: linkedInId,
      content: metaPost.content,
      gallery,
      accessToken,
    };

    const signalPublicContent =
      await this.linkedInPublicContent.publicContent(payloadRequest);
    const urn = signalPublicContent.id;

    await this.postEntity.updateOne(
      { _id: signalCreate._id },
      { $set: { urn, publishedLinked: true } },
    );

    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }
}
