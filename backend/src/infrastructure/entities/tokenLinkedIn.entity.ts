import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ABSEntityMongoDB } from 'libs/database/mongodb';

export enum TokenTypeLinkedIn {
  Bearer = 'Bearer',
}

export class TokenLinkedEntity extends ABSEntityMongoDB {
  @prop({ type: () => String, required: true })
  public accessToken: string;

  @prop({ type: () => String, required: true })
  public refreshToken: string;

  @prop({ type: () => String, required: true })
  public tokenId: string;

  @prop({ type: () => String, required: true })
  public scope: string;

  @prop({ type: () => Number, required: true })
  public expiresInAccessToken: number;

  @prop({ type: () => Number, required: true })
  public expiresInRefreshToken: number;

  @prop({
    type: () => String,
    required: true,
    default: () => TokenTypeLinkedIn.Bearer,
  })
  public tokenType: string;

  @prop({ type: () => String, required: true })
  public userId: string;

  @prop({ type: () => String, required: true })
  public linkedInId: string;

  @prop({ type: () => String, required: true })
  public linkedInName: string;

  static get model(): ModelType<TokenLinkedEntity> {
    return getModelForClass(TokenLinkedEntity, {
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
