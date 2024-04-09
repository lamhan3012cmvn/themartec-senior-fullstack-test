import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReturnModelType } from '@typegoose/typegoose';
import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfigService } from 'libs/environment';
import { InjectModel } from 'nestjs-typegoose';
import { CronsEnum } from 'src/domain';
import { PostEntity } from '../entities';

type ProfilePostsAndCommentsResponse = {
  success: boolean;
  data: Record<string, any>;
  message: string;
};

@Injectable()
export class AutoFetchReactionJob {
  @InjectModel(PostEntity) private readonly postEntity: ReturnModelType<
    typeof PostEntity
  >;

  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async fetchData() {
    const listPost = await this.postEntity.find({}).select('urn:').lean();

    // we use this method the updating our post while waiting the linked review our request
    for (const post of listPost) {
      try {
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: this.environmentConfigService.rapiapiFetchReactionURL,
          params: {
            urn: post.urn?.split(':')?.[3],
          },
          headers: {
            'X-RapidAPI-Key':
              this.environmentConfigService.rapiapiFetchReactionKey,
            'X-RapidAPI-Host':
              this.environmentConfigService.rapiapiFetchReactionHost,
          },
        };

        const response: ProfilePostsAndCommentsResponse =
          await axios.request(options);

        if (response && response.success)
          await this.postEntity.updateOne(
            { _id: post._id },
            {
              commentsCount: response.data.post.commentsCount,
              likeCount: response.data.post.likeCount,
            },
          );
      } catch (error) {
        console.error(error);
      }
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS, {
    name: CronsEnum.AUTO_FETCH_REACTION,
  })
  async autoFetchLinkedInReaction() {
    try {
      await this.fetchData();
    } catch (error) {
      console.log(error);
    }
  }
}
