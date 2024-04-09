import { mongoose, prop } from '@typegoose/typegoose';

export abstract class ABSEntityMongoDB {
  @prop({
    type: () => mongoose.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  })
  public _id: mongoose.Types.ObjectId;

  @prop({ required: true, default: () => new Date() })
  public createdAt: Date;

  @prop({ required: true, default: () => new Date() })
  public updatedAt: Date;

  @prop({ required: true, default: false })
  public createdBy: string;

  @prop({ required: true, default: false })
  public updatedBy: string;
}
