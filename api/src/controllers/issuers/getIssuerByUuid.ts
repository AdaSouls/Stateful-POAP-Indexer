import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getIssuerByUuid, IGetIssuerByUuidResult } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_issuer_by_uuid")
export class GetIssuerByUuidController extends Controller {
  @Get()
  public async get(
    @Query() issuerUuid: string
  ): Promise<IGetIssuerByUuidResult | IErrorResponse> {
    console.log("🚀 ~ GetIssuerByUuidController ~ issuerUuid:", issuerUuid)
    const pool = requirePool();

    try {
      const issuers = await getIssuerByUuid.run({ issuerUuid }, pool);
      console.log("🚀 ~ OwnerPoapsController ~ get ~ issuer:", issuers);

      return issuers[0];
    } catch (error: any) {
      console.error("❌ Error getting the issuer:", error);
      return {
        error: 'Failed to get issuer',
        details: error.message ?? error,
      };
    }


  }
}
