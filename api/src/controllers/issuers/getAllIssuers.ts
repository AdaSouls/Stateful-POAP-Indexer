import { Controller, Get, Route } from "tsoa";
import { getAllIssuers, requirePool } from "@game/db";

interface IGetAllIssuersResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

@Route("get_all_issuers")
export class AllIssuersController extends Controller {
  @Get()
  public async getAll(): Promise<{ issuers: IGetAllIssuersResult[] }> {
    console.log("🚀 ~ AllIssuersController ~ getAll adentro del controller");
    const pool = requirePool();

    const all = undefined;

    const issuers = await getAllIssuers.run(all, pool);
    console.log("🚀 ~ AllIssuersController ~ getAll ~ issuers:", issuers)

    return { issuers };
  }
}
