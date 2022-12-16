import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
      DB_PORT: Joi.number().default(5438),
      DB_HOSTNAME: Joi.string(),
      POSTGRES_PASSWORD: Joi.string().default("somereallycoolpassword"),
      POSTGRES_USERNAME: Joi.string().default("biobot"),
    }).unknown(true);

    const { error, value } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return value;
  }

  get databaseHostName(): string {
    return String(this.envConfig.DB_HOSTNAME);
  }

  get databaseUserName(): string {
    return String(this.envConfig.POSTGRES_USERNAME);
  }

  get databasePassword(): string {
    return String(this.envConfig.POSTGRES_PASSWORD);
  }

  get databasePort(): number {
    return Number(this.envConfig.DB_PORT);
  }

}
