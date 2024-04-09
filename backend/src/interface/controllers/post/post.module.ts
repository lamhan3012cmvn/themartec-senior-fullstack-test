import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypegooseModule } from 'nestjs-typegoose';
import {
  CreatePostLinkedInHandler,
  CreateStaticImageHandler,
} from 'src/application/command';
import {
  ImageEntity,
  PostEntity,
  TokenLinkedEntity,
} from 'src/infrastructure/entities';
import { PostController } from './post.controller';
import { LinkedInPublicContentModule } from 'libs/integrationPublicContentSocial';
import { FindListPostByUserHandler } from 'src/application/query/findListPostByUser';

const controllers = [PostController];
const infrastructure: Provider[] = [];
const application = [
  CreatePostLinkedInHandler,
  CreateStaticImageHandler,
  FindListPostByUserHandler,
];

@Module({
  imports: [
    TypegooseModule.forFeature([ImageEntity, TokenLinkedEntity, PostEntity]),
    CqrsModule,
    LinkedInPublicContentModule,
  ],
  controllers: [...controllers],
  providers: [...infrastructure, ...application],
})
export class PostModule {}
