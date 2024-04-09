import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ABSEntityMongoDB } from 'libs/database/mongodb';

export class AuthEntity extends ABSEntityMongoDB {
  @prop({ type: () => String, required: true, unique: true })
  public username: string;

  @prop({ type: () => String, required: true, unique: true })
  public password: string;

  @prop({ type: () => String, required: true, unique: true })
  public email: string;

  static get model(): ModelType<AuthEntity> {
    return getModelForClass(AuthEntity, {
      schemaOptions: {
        timestamps: true,
        collection: 'auth',
      },
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
