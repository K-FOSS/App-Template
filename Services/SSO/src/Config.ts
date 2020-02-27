// src/Config.ts
const defaultSecretKey = 'super-secret-key';

export const config = {
  secretKey: process.env.SECRET_KEY || defaultSecretKey,

  /**
   * Hostname of the API Server, used for GraphQL Requests
   */
  apiHost: process.env.API_HOST || 'api',

  /**
   * Shared API secret for internal GraphQL Requests
   */
  apiSharedSecretKey: process.env.API_SHARED_SECRET || defaultSecretKey,

  /**
   * UI Shared Secret to sign the Cookie with
   */
  uiSharedSecretKey: process.env.UI_SHARED_SECRET || defaultSecretKey,

  /**
   * Path the the Identity Provider XML Metadata file
   */
  metadataFile: process.env.METADATA_FILE || '/metadata.xml',

  /**
   * Public domain for the SSO Server. (MUST BE HTTPS)
   */
  publicDomain: process.env.DOMAIN || 'example.com',
};
