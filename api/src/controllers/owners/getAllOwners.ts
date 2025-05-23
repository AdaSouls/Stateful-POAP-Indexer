import { Controller, Get, Route } from "tsoa";
import { getAllOwners, IGetAllOwnersParams, IGetAllOwnersResult, requirePool } from "@game/db";

@Route("get_all_owners")
export class AllOwnersController extends Controller {
  @Get()
  public async getAll(): Promise<{ owners: IGetAllOwnersResult[] }> {
    console.log("🚀 ~ AllOwnersController ~ getAll adentro del controller");
    const pool = requirePool();

    const all = undefined as IGetAllOwnersParams;

    const owners = await getAllOwners.run(all, pool);
    console.log("🚀 ~ AllOwnersController ~ getAll ~ owners:", owners)

    return { owners };
  }
}
