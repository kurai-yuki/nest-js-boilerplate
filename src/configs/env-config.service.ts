import { config } from 'dotenv';

config({ path: '../../../.env' });

export class EnvConfigService {
  static get(name: string): string | undefined {
    return process.env[name];
  }

  static getNumber(name: string): number | undefined {
    return Number(process.env[name]);
  }

  static getBoolean(name: string): boolean | undefined {
    return Boolean(process.env[name]);
  }
}
