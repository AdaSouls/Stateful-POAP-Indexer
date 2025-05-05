import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerPoaps, getLastEvent } from "@game/db";
import type { LastEventResponse } from "@game/utils";

@Route("last_event")
export class LastEventController extends Controller {
  @Get()
  public async get(): Promise<LastEventResponse> {
    const pool = requirePool();

    // (alias) new PreparedQuery<void, IGetLastEventResult>(queryIR: SQLQueryIR): PreparedQuery<void, IGetLastEventResult>
  
    const events = await getLastEvent.run(undefined, pool);
    // const events = await getLastEvent.run(undefined, pool);
    console.log("🚀 ~ LastEventController ~ get ~ events:", events);
    const event = events[0];
    return { event };
  }
}
