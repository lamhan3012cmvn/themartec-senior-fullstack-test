import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongoDbModule } from 'libs/database/mongodb';
import { EnvironmentConfigModule } from 'libs/environment';
import { LinkedInPublicContentModule } from 'libs/integrationPublicContentSocial';
import { join } from 'path';
import { CronsModule } from './infrastructure/crons';
import {
  AuthenticationModule,
  LinkedInModule,
  PostModule,
} from './interface/controllers';
import { LoggerModule } from 'libs/logger/logger.module';

const globalModules = [LoggerModule];

const publicControllerModules = [
  AuthenticationModule,
  LinkedInModule,
  PostModule,
];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongoDbModule,
    EnvironmentConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'.repeat(2), 'public'),
    }),
    LinkedInPublicContentModule,
    CronsModule,
    ...globalModules,
    ...publicControllerModules,
  ],
})
export class AppModule {}
