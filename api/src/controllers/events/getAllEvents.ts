import { Controller, Get, Query, Route } from "tsoa";
import { getAllEvents, IGetAllEventsResult, requirePool } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_all_events")
export class AllEventsController extends Controller {
  @Get()
  public async getAll(): Promise<IGetAllEventsResult[] | IErrorResponse> {
    const pool = requirePool();

    try {
      const events = await getAllEvents.run(undefined, pool);
      // console.log("🚀 ~ EventsController ~ getAll ~ events:", events);
      return events;
    } catch (error: any) {
      console.error("❌ Error getting all events:", error);
      return {
        error: 'Failed to get events',
        details: error.message ?? error,
      };
    }
  }
}
