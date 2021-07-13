const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const knexFile = require('../../knexfile');

dotenv.config({ path: path.join(__dirname, '../../.env') });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('local', 'production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    DB_HOST: Joi.string().required().description('SQL Server host'),
    DB_PORT: Joi.number().required().description('SQL Server port'),
    DB_USER: Joi.string().required().description('SQL Server user'),
    DB_PASSWORD: Joi.string().required().description('SQL Server password'),
    DB_NAME: Joi.string().required().description('SQL Server database name'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  knexConfig: knexFile[envVars.NODE_ENV],
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
