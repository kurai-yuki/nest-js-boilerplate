import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerFactory } from './configs/loggers/logger.factory';
import { EnvConfigService } from './configs/env-config.service';

async function bootstrap() {
  const logger = LoggerFactory();
  const port = EnvConfigService.getNumber('PORT') ?? 3000;

  const app = await NestFactory.create(AppModule, { logger });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);

  logger.log(`Server is running on port: ${port}`, 'Initialization');
}

void bootstrap();
