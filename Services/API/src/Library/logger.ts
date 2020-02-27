// src/Library/logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export async function log<MSG>(
  logLevel: LogLevel = 'info',
  ...message: (string | object)[]
): Promise<void> {
  console[logLevel](...message);
}
