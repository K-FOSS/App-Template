// src/Config/index.ts
interface Config {
  /**
   * Public name of the Application
   */
  appName: string;

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

export const config: Config = {
  appName: process.env.APP_NAME || 'App Template',
  googleStackDriver: process.env.GOOGLE_CLOUD_STACKDRIVER === 'true' || true,
  googleCloud: process.env.GOOGLE_CLOUD === 'true' || true,

  database: {
    host: 'database',
    database: 'app-template',
    port: 5432,
    username: 'postgres',
    password: 'pgpass',
  },
};
