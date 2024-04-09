import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'libs/environment';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [EnvironmentConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
