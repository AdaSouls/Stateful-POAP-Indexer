import { Controller, Get, Query, Route } from 'tsoa';
import { requirePool, getOwnerPoaps, getLastEvent } from '@game/db';
import type { LastEventResponse } from '@game/utils';

@Route('last_event')
export class LastEventController extends Controller {
  @Get()
  public async get(@Query() undefined: any ): Promise<LastEventResponse> {
    const pool = requirePool();

    const events = await getLastEvent.run(undefined,
      pool
    );
    const event = events[0];
    return { event };
  }
}
