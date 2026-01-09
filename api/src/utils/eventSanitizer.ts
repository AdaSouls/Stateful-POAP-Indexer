/**
 * Utility functions to sanitize event objects before sending to frontend.
 * Removes null transaction_hash and block_number fields to make them appear
 * as if they don't exist in the database.
 */

import { IGetAllEventsResult, IGetEventsWithFiltersResult, ICreateEventResult as IDbCreateEventResult } from '@game/db';

type EventResult = IGetAllEventsResult | IGetEventsWithFiltersResult | IDbCreateEventResult;

/**
 * Removes transaction_hash and block_number fields from event object if they are null.
 * This makes the frontend feel like these fields don't exist in the database when they're null.
 * Returns the event with these fields removed if they were null, otherwise returns the event as-is.
 */
export function sanitizeEvent<T extends EventResult>(event: T): Omit<T, 'transaction_hash' | 'block_number'> & Partial<Pick<T, 'transaction_hash' | 'block_number'>> {
  const sanitized = { ...event } as any;
  
  // Remove transaction_hash if it's null
  if (sanitized.transaction_hash === null || sanitized.transaction_hash === undefined) {
    delete sanitized.transaction_hash;
  }
  
  // Remove block_number if it's null
  if (sanitized.block_number === null || sanitized.block_number === undefined) {
    delete sanitized.block_number;
  }
  
  return sanitized;
}

/**
 * Sanitizes an array of events by removing null transaction_hash and block_number fields.
 */
export function sanitizeEvents<T extends EventResult>(events: T[]): Array<Omit<T, 'transaction_hash' | 'block_number'> & Partial<Pick<T, 'transaction_hash' | 'block_number'>>> {
  return events.map(sanitizeEvent);
}

