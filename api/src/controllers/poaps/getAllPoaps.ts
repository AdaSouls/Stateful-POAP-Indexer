import { Controller, Get, Query, Route } from "tsoa";
import { getAllPoaps, IGetAllPoapsResult, requirePool } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_all_poaps")
export class AllPoapsController extends Controller {
  @Get()
  public async getAll(): Promise<IGetAllPoapsResult[] | IErrorResponse> {
    const pool = requirePool();

    try {
      const poaps = await getAllPoaps.run(undefined, pool);
      // console.log("🚀 ~ PoapsController ~ getAll ~ poaps:", poaps);

      return poaps;
    } catch (error: any) {
      console.error("❌ Error getting all poaps:", error);
      return {
        error: 'Failed to get poaps',
        details: error.message ?? error,
      };
    }


  }
}
