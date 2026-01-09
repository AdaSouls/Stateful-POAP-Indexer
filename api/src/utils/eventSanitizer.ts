/**
 * Utility functions to filter events before sending to frontend.
 * Only events with a transaction_hash are returned.
 */

import { IGetAllEventsResult, IGetEventsWithFiltersResult, ICreateEventResult as IDbCreateEventResult } from '@game/db';

type EventResult = IGetAllEventsResult | IGetEventsWithFiltersResult | IDbCreateEventResult;

/**
 * Filters out events that don't have a transaction_hash.
 * Only events with a non-null transaction_hash are returned.
 */
export function filterEventsWithTransactionHash<T extends EventResult>(events: T[]): T[] {
  return events.filter(event => 
    event.transaction_hash !== null && 
    event.transaction_hash !== undefined && 
    event.transaction_hash !== ''
  );
}

