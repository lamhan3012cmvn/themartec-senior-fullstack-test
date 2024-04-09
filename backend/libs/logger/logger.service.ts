import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';

import { EnvironmentConfigService } from 'libs/environment';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly _logger: winston.Logger;

  constructor(private readonly _envConfigService: EnvironmentConfigService) {
    super(LoggerService.name, { timestamp: true });
    this._logger = winston.createLogger(_envConfigService.winstonConfig);
    if (_envConfigService.isProduction) {
      this._logger.debug('Logging initialized at debug level');
    }
  }
  log(message: string): void {
    this._logger.info(message);
  }
  info(message: string): void {
    this._logger.info(message);
  }
  debug(message: string): void {
    this._logger.debug(message);
  }
  error(message: string, trace?: any, context?: string): void {
    // i think the trace should be JSON Stringified
    this._logger.error(
      `${context || ''} ${message} -> (${trace || 'trace not provided !'})`,
    );
  }
  warn(message: string): void {
    this._logger.warn(message);
  }
}
