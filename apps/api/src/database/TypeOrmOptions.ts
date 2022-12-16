import { Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ConfigService } from '../modules/config';

import { getMetadataArgsStorage } from 'typeorm';
import * as migrations from '../migrations';

export class TypeOrmOptions implements TypeOrmOptionsFactory {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) { }

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.databaseHostName,
      port: this.configService.databasePort,
      username: this.configService.databaseUserName || 'biobot',
      password: this.configService.databasePassword || 'somereallycoolpassword',
      database: 'bots',
      synchronize: false,
      logging: false,
      migrationsRun: true,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      migrations: migrations,
    };
  }
}
