export function logger(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  const timestamp = new Date().toISOString();
  const logLevel = level.toUpperCase();
  // eslint-disable-next-line no-console
  console.log(`[${timestamp}] [${logLevel}] ${message}`);
}

export const log = {
  info: (message: string) => logger(message, 'info'),
  warn: (message: string) => logger(message, 'warn'),
  error: (message: string) => logger(message, 'error'),
};
