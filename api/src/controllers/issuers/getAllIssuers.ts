import { Controller, Get, Route } from "tsoa";
import { getAllIssuers, requirePool, IGetAllIssuersResult } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_all_issuers")
export class AllIssuersController extends Controller {
  @Get()
  public async getAll(): Promise<IGetAllIssuersResult[] | IErrorResponse> {
    console.log("🚀 ~ AllIssuersController ~ getAll adentro del controller");
    const pool = requirePool();

    try {
      const all = undefined;

      const issuers = await getAllIssuers.run(all, pool);
      console.log("🚀 ~ AllIssuersController ~ getAll ~ issuers:", issuers)

      return issuers;
    } catch (error: any) {
      console.error("❌ Error getting all issuers:", error);
      return {
        error: 'Failed to get issuers',
        details: error.message ?? error,
      };
    }

  }
}
