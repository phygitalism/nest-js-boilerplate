import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

import { LoggerService } from './logger/logger.service';
import { LoggingInterceptor } from './service/logger.interceptor';
import { HttpErrorFilter } from './service/error.handler';

import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.dbUrl,
          type: configService.dbDialect,
          port: configService.dbPort,
          username: configService.dbUser,
          password: configService.dbPass,
          database: configService.dbName,
          synchronize: true,
          entities: [__dirname + '/api/**/*.entity{.ts,.js}'],
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor(connection: Connection) {}
}
