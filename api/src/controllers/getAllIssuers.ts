import { Controller, Get, Route } from "tsoa";
import { getAllIssuers, IGetAllIssuersParams, IGetAllIssuersResult, requirePool } from "@game/db";

@Route("get_all_issuers")
export class AllIssuersController extends Controller {
  @Get()
  public async getAll(): Promise<{ issuers: IGetAllIssuersResult[] }> {
    console.log("🚀 ~ AllIssuersController ~ getAll adentro del controller");
    const pool = requirePool();

    const all = undefined as IGetAllIssuersParams;

    const issuers = await getAllIssuers.run(all, pool);
    console.log("🚀 ~ AllIssuersController ~ getAll ~ issuers:", issuers)

    return { issuers };
  }
}
