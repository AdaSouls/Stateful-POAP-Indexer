import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getIssuerByAddress } from "@game/db";
import type { GetIssuerByAddressResponse } from "@game/utils";

@Route("get_issuer_by_address")
export class GetIssuerByAddressController extends Controller {
  @Get()
  public async get(
    @Query() address: string
  ): Promise<GetIssuerByAddressResponse> {
    console.log("🚀 ~ GetIssuerByAddressController ~ address:", address);
    const pool = requirePool();

    const issuers = await getIssuerByAddress.run({ address }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ issuer:", issuers);
    const issuer = issuers[0] || null;
    return { issuer } as GetIssuerByAddressResponse;
  }
}
