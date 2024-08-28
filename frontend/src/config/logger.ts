/**
 * Log levels
 *
 * @export
 * @enum {number}
 */
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

/**
 * A custom and powerful logger class
 *
 * This class provides logging functionality for the application.
 * It provides methods to log messages at different log levels.
 *
 * @class Logger
 * @typedef {Logger}
 */
class Logger {
  /**
   * Logs a message
   *
   * @param {string} message
   * @param {?string} [context]
   */
  log(message: string, context?: string) {
    console.info(this.formatMessage(LogLevel.INFO, message, context));
  }

  /**
   * Logs an info message
   *
   * @param {string} message
   * @param {?string} [context]
   */
  info(message: string, context?: string) {
    console.info(this.formatMessage(LogLevel.INFO, message, context));
  }

  /**
   * Logs a warning message
   *
   * @param {string} message
   * @param {?string} [context]
   */
  warn(message: string, context?: string) {
    console.warn(this.formatMessage(LogLevel.WARN, message, context));
  }

  /**
   * Logs an error message
   *
   * @param {unknown} message
   * @param {?string} [context]
   */
  error(message: unknown, context?: string) {
    const errorMessage = this.formatError(message);
    console.error(this.formatMessage(LogLevel.ERROR, errorMessage, context));
  }

  /**
   * Logs a debug message
   *
   * @param {string} message
   * @param {?string} [context]
   */
  debug(message: string, context?: string) {
    console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: string
  ): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}]${context ? ` [${context}]` : ''} ${message}`;
  }

  /**
   * Formats an error message
   *
   * @private
   * @param {unknown} error
   * @returns {string}
   */
  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack}`;
    }
    return String(error);
  }
}

export const logger = new Logger();
