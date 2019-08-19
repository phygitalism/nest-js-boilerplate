import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { EnvInterface } from './constants/env.interface';

export class ConfigService {
  private readonly envConfig: EnvInterface;

  constructor() {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    ) {
      this.envConfig = ConfigService.getConfigObj(process.env);
    } else {
      this.envConfig = ConfigService.getConfigObj(
        dotenv.parse(fs.readFileSync('.env')),
      );
    }
  }

  private static getConfigObj(envSource: {
    [key: string]: string;
  }): EnvInterface {
    return {
      API_PREFIX: envSource.API_PREFIX || 'api',
      DB_DIALECT: envSource.DB_DIALECT || 'postgres',
      DB_NAME: envSource.DB_NAME,
      DB_PASS: envSource.DB_PASS,
      DB_PORT: Number(envSource.DB_PORT),
      DB_URL: envSource.DB_URL,
      DB_USER: envSource.DB_USER,
      PORT: Number(envSource.PORT),
      JWT_EXPIRES_IN: Number(envSource.JWT_EXPIRES_IN),
      JWT_SECRET_KEY: envSource.JWT_SECRET_KEY,
    };
  }

  get apiPrefix(): string {
    return this.envConfig.API_PREFIX;
  }

  get dbDialect(): string {
    return this.envConfig.DB_DIALECT;
  }

  get dbName(): string {
    return this.envConfig.DB_NAME;
  }

  get dbPass(): string {
    return this.envConfig.DB_PASS;
  }

  get dbPort(): number {
    return this.envConfig.DB_PORT;
  }

  get dbUrl(): string {
    return this.envConfig.DB_URL;
  }

  get dbUser(): string {
    return this.envConfig.DB_USER;
  }

  get port(): number {
    return this.envConfig.PORT;
  }

  get jwtSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }

  get jwtExpiresIn(): number {
    return this.envConfig.JWT_EXPIRES_IN;
  }
}
