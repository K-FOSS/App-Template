import 'react';

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }

  interface Window {
    APOLLO_STATE: object;
  }
}
