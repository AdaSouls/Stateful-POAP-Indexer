import { Controller, Get, Query, Route } from "tsoa";
import { getAllEvents, IGetAllEventsResult, requirePool } from "@game/db";

@Route("get_all_events")
export class AllEventsController extends Controller {
  @Get()
  public async getAll(): Promise<{ events: IGetAllEventsResult[] }> {
    const pool = requirePool();

    const events = await getAllEvents.run(undefined, pool);
    console.log("🚀 ~ EventsController ~ getAll ~ events:", events);

    return { events };
  }
}
