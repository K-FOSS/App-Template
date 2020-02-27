// Server/Config.ts
export const config = {
  secretKey: process.env.SECRET_KEY || 'super-secret-key',
  ssoEnabled: true,
};
