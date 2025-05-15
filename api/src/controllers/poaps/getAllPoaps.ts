import { Controller, Get, Query, Route } from "tsoa";
import { getAllPoaps, IGetAllPoapsResult, requirePool } from "@game/db";

@Route("get_all_poaps")
export class AllPoapsController extends Controller {
  @Get()
  public async getAll(): Promise<{ poaps: IGetAllPoapsResult[] }> {
    const pool = requirePool();

    const poaps = await getAllPoaps.run(undefined, pool);
    console.log("🚀 ~ PoapsController ~ getAll ~ poaps:", poaps);

    return { poaps };
  }
}
