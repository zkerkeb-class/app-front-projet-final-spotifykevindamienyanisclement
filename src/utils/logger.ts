const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message, ...args);
    }
  },
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(message, error);
    }

    // TODO: Add Sentry error reporting
  },
  warn: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(message, ...args);
    }
  },
};

export default logger;
