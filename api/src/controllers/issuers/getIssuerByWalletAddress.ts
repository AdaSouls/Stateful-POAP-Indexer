import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getIssuerByWalletAddress } from "@game/db";
import { GetIssuerByWalletAddressResponse, IErrorResponse } from "@game/utils";

@Route("get_issuer_by_address")
export class GetIssuerByWalletAddressController extends Controller {
  @Get()
  public async get(
    @Query() walletAddress: string
  ): Promise<GetIssuerByWalletAddressResponse | IErrorResponse> {
    console.log("🚀 ~ GetIssuerByWalletAddressController ~ address:", walletAddress);
    const pool = requirePool();

    try {
      const issuers = await getIssuerByWalletAddress.run({ walletAddress }, pool);
      console.log("🚀 ~ OwnerPoapsController ~ get ~ issuer:", issuers);
      const issuer = issuers[0] || null;
      return { issuer } as GetIssuerByWalletAddressResponse;
    } catch (error: any) {
      console.error("❌ Error getting the issuer:", error);
      return {
        error: 'Failed to get issuer',
        details: error.message ?? error,
      };
    }


  }
}
