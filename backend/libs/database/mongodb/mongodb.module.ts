import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb+srv://lamhan3012:6azh53Sf2zTflZVR@cluster0.ze0pngf.mongodb.net',
      {},
    ),
  ],
})
export class MongoDbModule {}
