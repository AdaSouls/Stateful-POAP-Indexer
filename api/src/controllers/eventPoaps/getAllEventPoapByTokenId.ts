import { Controller, Get, Route } from "tsoa";
import { getAllEventPoaps, IGetAllEventPoapsParams, IGetAllEventPoapsResult, requirePool } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_all_event_poap_by_token_id")
export class AllEventPoapByTokenIdController extends Controller {
  @Get()
  public async getAll(): Promise<IGetAllEventPoapsResult[] | IErrorResponse> {
    console.log("🚀 ~ AllEventPoapsController ~ getAll adentro del controller");
    const pool = requirePool();

    try {
      const all = undefined as IGetAllEventPoapsParams;

      const eventPoaps = await getAllEventPoaps.run(all, pool);
      console.log("🚀 ~ AllEventPoapsController ~ getAll ~ eventPoaps:", eventPoaps)

      return eventPoaps;
    } catch (error: any) {
      console.error("❌ Error getting all event_poap:", error);
      return {
        error: 'Failed to get event_poap',
        details: error.message ?? error,
      };
    }

  }
}
