import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType, Ref } from '@typegoose/typegoose/lib/types';
import { ABSEntityMongoDB } from 'libs/database/mongodb';
import { ImageEntity } from './image.entity';

export class PostEntity extends ABSEntityMongoDB {
  @prop({ required: true })
  author!: string;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  content!: string;

  @prop({ ref: () => ImageEntity, default: [] })
  gallery: Ref<ImageEntity>[];

  @prop({ default: false })
  publishedLinked?: boolean; // Indicates whether the post has been published on LinkedIn

  @prop({ type: () => String, default: null })
  urn: string; // LinkedIn post ID

  @prop({ type: () => Number, default: 0 })
  likeCount: number;

  @prop({ type: () => Number, default: 0 })
  commentsCount: number;

  static get model(): ModelType<PostEntity> {
    return getModelForClass(PostEntity, {
      schemaOptions: {
        timestamps: true,
        collection: 'post',
      },
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
