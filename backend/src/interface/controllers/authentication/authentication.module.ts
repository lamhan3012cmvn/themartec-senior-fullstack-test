import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from 'src/infrastructure/strategies';
import {
  LoginLocalHandler,
  RefreshTokenHandler,
  RegisterLocalHandler,
} from 'src/application/command';
import { AuthEntity, TokenEntity } from 'src/infrastructure/entities';
import { PasswordModule } from 'libs/password/password.module';
import { EnvironmentConfigModule } from 'libs/environment';

const controllers = [AuthenticationController];
const infrastructure: Provider[] = [JwtStrategy];
const application = [
  LoginLocalHandler,
  RegisterLocalHandler,
  RefreshTokenHandler,
];

@Module({
  imports: [
    TypegooseModule.forFeature([AuthEntity, TokenEntity]),
    PassportModule,
    PasswordModule,
    EnvironmentConfigModule,
    JwtModule.register({
      secret: 'hello',
      signOptions: { expiresIn: '600s' },
    }),
    CqrsModule,
  ],
  controllers: [...controllers],
  providers: [...infrastructure, ...application],
})
export class AuthenticationModule {}
