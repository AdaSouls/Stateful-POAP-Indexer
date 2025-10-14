import { Controller, Get, Route } from "tsoa";
import { getAllOwners, IGetAllOwnersParams, IGetAllOwnersResult, requirePool } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_all_owners")
export class AllOwnersController extends Controller {
  @Get()
  public async getAll(): Promise<IGetAllOwnersResult[] | IErrorResponse> {
    console.log("🚀 ~ AllOwnersController ~ getAll adentro del controller");
    const pool = requirePool();

    try {
      const all = undefined as IGetAllOwnersParams;

      const owners = await getAllOwners.run(all, pool);
      console.log("🚀 ~ AllOwnersController ~ getAll ~ owners:", owners)

      return owners;
    } catch (error: any) {
      console.error("❌ Error getting all owners:", error);
      return {
        error: 'Failed to get owners',
        details: error.message ?? error,
      };
    }


  }
}
