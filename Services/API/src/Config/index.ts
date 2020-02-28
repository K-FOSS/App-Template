// src/Config/index.ts
type AppEnvironment = 'production' | 'testing' | 'development' | 'staging';

interface Config {
  /**
   * Public name of the Application
   */
  appName: string;

  /**
   *
   */
  appEnv: AppEnvironment;

  /**
   * Google Cloud Features Flag
   */
  googleCloud: boolean;

  /**
   * Google Cloud StackDriver Enabled for logging endpoint
   */
  googleStackDriver: boolean;

  /**
   * Database Configuration
   */
  database: {
    /**
     * Host of the Postgres Database
     */
    host: string;

    /**
     * Database for the application to use
     */
    database: string;

    /**
     * Port of the database server
     */
    port: number;

    /**
     * Username for non Admin
     */
    username: string;

    /**
     * Database users password
     */
    password: string;
  };
}

let appEnv: AppEnvironment;
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'testing' ||
  process.env.NODE_ENV === 'staging'
)
  appEnv = process.env.NODE_ENV as 'production' | 'testing' | 'staging';
else appEnv = 'development';

export const config: Config = {
  appName: process.env.APP_NAME || 'App Template',
  googleStackDriver: process.env.GOOGLE_CLOUD_STACKDRIVER === 'true' || true,
  googleCloud: process.env.GOOGLE_CLOUD === 'true' || true,
  appEnv,

  database: {
    host: 'database',
    database: 'app-template',
    port: 5432,
    username: 'postgres',
    password: 'pgpass',
  },
};
