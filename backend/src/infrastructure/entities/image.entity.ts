import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Exclude } from 'class-transformer';
import { ABSEntityMongoDB } from 'libs/database/mongodb';

@Exclude()
export class ImageEntity extends ABSEntityMongoDB {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  src: string;

  @prop({ default: null })
  type: string;

  static get model(): ModelType<ImageEntity> {
    return getModelForClass(ImageEntity, {
      schemaOptions: {
        timestamps: true,
        collection: 'images',
      },
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
