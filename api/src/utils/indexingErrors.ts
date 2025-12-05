/**
 * Error handling infrastructure for blockchain indexing
 */

export enum IndexingErrorType {
  PARSING_ERROR = 'PARSING_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  REORG_ERROR = 'REORG_ERROR',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface ProcessingContext {
  blockNumber?: number;
  txHash?: string;
  eventType?: string;
  eventId?: number;
  tokenId?: number;
  [key: string]: any;
}

export class IndexingError extends Error {
  public readonly type: IndexingErrorType;
  public readonly context: ProcessingContext;
  public readonly timestamp: Date;
  public readonly retryable: boolean;

  constructor(
    message: string,
    type: IndexingErrorType,
    context: ProcessingContext = {},
    retryable: boolean = false
  ) {
    super(message);
    this.name = 'IndexingError';
    this.type = type;
    this.context = context;
    this.timestamp = new Date();
    this.retryable = retryable;
    
    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IndexingError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
      retryable: this.retryable,
      stack: this.stack
    };
  }
}

/**
 * Determines if an error is retryable based on its type
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof IndexingError) {
    return error.retryable;
  }

  // Network errors are typically retryable
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      message.includes('econnrefused') ||
      message.includes('etimedout')
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Classifies an error into an IndexingErrorType
 */
export function classifyError(error: unknown, context: ProcessingContext = {}): IndexingError {
  if (error instanceof IndexingError) {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // Network errors
    if (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      message.includes('fetch failed')
    ) {
      return new IndexingError(
        error.message,
        IndexingErrorType.NETWORK_ERROR,
        context,
        true // Network errors are retryable
      );
    }

    // Database errors
    if (
      message.includes('database') ||
      message.includes('postgres') ||
      message.includes('sql') ||
      message.includes('duplicate key') ||
      message.includes('23505') // PostgreSQL unique violation
    ) {
      return new IndexingError(
        error.message,
        IndexingErrorType.DATABASE_ERROR,
        context,
        false // Database errors are usually not retryable (except connection issues)
      );
    }

    // Transaction errors
    if (
      message.includes('transaction') ||
      message.includes('receipt') ||
      message.includes('revert')
    ) {
      return new IndexingError(
        error.message,
        IndexingErrorType.TRANSACTION_ERROR,
        context,
        false
      );
    }
  }

  // Unknown error
  return new IndexingError(
    error instanceof Error ? error.message : String(error),
    IndexingErrorType.UNKNOWN_ERROR,
    context,
    false
  );
}


