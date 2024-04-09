import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ABSEntityMongoDB } from 'libs/database/mongodb';

export class TokenEntity extends ABSEntityMongoDB {
  @prop({ type: () => String, required: true, unique: true })
  public accessToken: string;

  @prop({ type: () => String, required: true, unique: true })
  public refreshToken: string;

  @prop({ type: () => [String], required: true, default: [] })
  public accessTokenUsed: Array<string>;

  @prop({ type: () => [String], required: true, default: [] })
  public refreshTokenUsed: Array<string>;

  @prop({ type: () => String, required: true })
  public userId: string;

  static get model(): ModelType<TokenEntity> {
    return getModelForClass(TokenEntity, {
      schemaOptions: {
        timestamps: true,
        collection: 'token',
      },
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
