import type { Knex } from 'knex';
import { EnvConfigService } from '../env-config.service';
import { Logger } from '@nestjs/common';

const configs: Knex.Config = {
  client: 'postgresql',
  connection: EnvConfigService.get('DATABASE_URL'),
  debug: false, // if you need to debug
  useNullAsDefault: true,
  log: {
    debug: (message) => Logger.debug(message, 'Knex-log'),
    error: (message) => Logger.error(message, 'Knex-log'),
    warn: (message) => Logger.warn(message, 'Knex-log'),
    enableColors: true,
  },
  seeds: {
    directory: './seeds',
    extension: 'ts',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
};

export default configs;
