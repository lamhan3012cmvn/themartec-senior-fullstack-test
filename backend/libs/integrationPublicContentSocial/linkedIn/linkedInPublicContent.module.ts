import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LinkedInPublicContent } from '.';
import { EnvironmentConfigModule } from 'libs/environment';

@Module({
  imports: [EnvironmentConfigModule, HttpModule],
  providers: [LinkedInPublicContent],
  exports: [LinkedInPublicContent],
})
export class LinkedInPublicContentModule {}
