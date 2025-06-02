import { Controller, Get, Route } from "tsoa";
import { getAllEventPoaps, IGetAllEventPoapsParams, IGetAllEventPoapsResult, requirePool } from "@game/db";

@Route("get_all_event_poap_relations")
export class AllEventPoapRelationsController extends Controller {
  @Get()
  public async getAll(): Promise<IGetAllEventPoapsResult[]> {
    console.log("🚀 ~ AllEventPoapsController ~ getAll adentro del controller");
    const pool = requirePool();

    const all = undefined as IGetAllEventPoapsParams;

    const eventPoapRelations = await getAllEventPoaps.run(all, pool);
    console.log("🚀 ~ AllEventPoapsController ~ getAll ~ eventPoapRelations:", eventPoapRelations)

    return eventPoapRelations;
  }
}
