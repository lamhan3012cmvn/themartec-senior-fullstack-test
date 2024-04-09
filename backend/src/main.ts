import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'libs/http';
import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from 'libs/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerModule, LoggerService } from 'libs/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const environmentConfigModule = app.select(EnvironmentConfigModule);
  const environmentConfigService = environmentConfigModule.get(
    EnvironmentConfigService,
  );

  const loggerModule = app.select(LoggerModule);
  const loggerService = loggerModule.get(LoggerService);

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  if (!environmentConfigService.isProduction) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Doc API')
        .setDescription('My Doc API')
        .setVersion('1.0')
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }

  const PORT = environmentConfigService.port;
  await app.listen(PORT).then(() => {
    loggerService.info(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();
