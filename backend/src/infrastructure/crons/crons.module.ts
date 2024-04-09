import { AutoFetchReactionJob } from './autoFetchReaction.cron';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostEntity } from '../entities';
import { EnvironmentConfigModule } from 'libs/environment';

@Module({
  imports: [TypegooseModule.forFeature([PostEntity]), EnvironmentConfigModule],
  providers: [AutoFetchReactionJob],
  exports: [AutoFetchReactionJob],
})
export class CronsModule {}
