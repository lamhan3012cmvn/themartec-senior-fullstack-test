import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { PostEntity, ImageEntity } from 'src/infrastructure/entities';
import { CreateStaticImageCommand } from './createStaticImage.command';
import { CreateStaticImageResult } from './createStaticImage.result';

@CommandHandler(CreateStaticImageCommand)
export class CreateStaticImageHandler
  implements ICommandHandler<CreateStaticImageCommand, CreateStaticImageResult>
{
  @InjectModel(ImageEntity)
  private readonly imageEntity: ReturnModelType<typeof ImageEntity>;

  @InjectModel(PostEntity) private readonly postEntity: ReturnModelType<
    typeof PostEntity
  >;

  private buildImageEntity(files: any) {
    return files.map((file: any) => {
      const image = new ImageEntity();
      image.name = file.originalname;
      image.src = file.path.replace('public/', '');
      image.type = 'image';
      return image;
    });
  }

  async execute(
    command: CreateStaticImageCommand,
  ): Promise<CreateStaticImageResult> {
    const { files } = command.payload;

    const imageEntities = this.buildImageEntity(files);

    const signalCreateManyFiles =
      await this.imageEntity.insertMany(imageEntities);

    return {
      images: signalCreateManyFiles.map((signal) => signal as ImageEntity),
    };
  }
}
