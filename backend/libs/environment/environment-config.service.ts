import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  linkedInClientId(): string {
    return this.configService.get<string>('LINKED_CLIENT_ID');
  }
  linkedInClientSecret(): string {
    return this.configService.get<string>('LINKED_CLIENT_SECRET');
  }

  get linkedInENV(): {
    clientId: string;
    clientSecret: string;
    redirectURI: string;
    baseURLAPI: string;
    baseOAUTH: string;
  } {
    return {
      clientId: this.configService.get<string>('LINKED_CLIENT_ID'),
      clientSecret: this.configService.get<string>('LINKED_CLIENT_SECRET'),
      redirectURI: this.configService.get<string>('LINKED_IN_REDIRECT'),
      baseURLAPI: this.configService.get<string>('LINKED_IN_URL'),
      baseOAUTH: this.configService.get<string>('LINKED_IN_OAUTH'),
    };
  }

  staticBaseURL(): string {
    return this.configService.get<string>('STATIC_BASE_URL');
  }

  get rapiapiFetchReactionURL() {
    return this.configService.get<string>('RAPI_API_FETCH_REACTION_URL');
  }

  get rapiapiFetchReactionKey() {
    return this.configService.get<string>('RAPI_API_FETCH_REACTION_KEY');
  }

  get rapiapiFetchReactionHost() {
    return this.configService.get<string>('RAPI_API_FETCH_REACTION_HOST');
  }

  get tokenSecret() {
    return this.configService.get<string>('TOKEN_SECRET');
  }

  get tokenExpiresIn() {
    return this.configService.get<string>('TOKEN_EXPIRES_IN');
  }

  get refreshTokenExpiresIn() {
    return this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN');
  }

  get winstonConfig() {
    return {
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: `./logs/${this.nodeEnv}/debug-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/${this.nodeEnv}/error-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '30d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss',
            }),
            winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    };
  }
}
