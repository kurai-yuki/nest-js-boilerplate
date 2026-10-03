import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { KnexModule } from 'nest-knexjs';
import configs from './configs/database/knexfile';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: configs,
      retryAttempts: 3,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10, // number of request per second
          ttl: 60000, // seconds per request
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
