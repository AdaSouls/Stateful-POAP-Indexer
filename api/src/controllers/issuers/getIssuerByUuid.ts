import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getIssuerByUuid, IGetIssuerByUuidResult } from "@game/db";

@Route("get_issuer_by_uuid")
export class GetIssuerByUuidController extends Controller {
  @Get()
  public async get(
    @Query() issuerUuid: string
  ): Promise<IGetIssuerByUuidResult> {
    console.log("🚀 ~ GetIssuerByUuidController ~ issuerUuid:", issuerUuid)
    const pool = requirePool();

    const issuers = await getIssuerByUuid.run({ issuerUuid }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ issuer:", issuers);

    return issuers[0];
  }
}
