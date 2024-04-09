import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LinkedInPublicContentModule } from 'libs/integrationPublicContentSocial';
import { TypegooseModule } from 'nestjs-typegoose';
import { CheckAuthLinkedinHandler } from 'src/application/query/checkAuthLinkedin';
import {
  ImageEntity,
  PostEntity,
  TokenLinkedEntity,
} from 'src/infrastructure/entities';
import { LinkedInController } from './linkedIn.controller';
import { LinkedInCallbackHandler } from 'src/application/command';
import { IsAuthenticatedLinkedinHandler } from 'src/application/query';

const controllers = [LinkedInController];
const infrastructure: Provider[] = [];
const application = [
  CheckAuthLinkedinHandler,
  LinkedInCallbackHandler,
  IsAuthenticatedLinkedinHandler,
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
export class LinkedInModule {}
