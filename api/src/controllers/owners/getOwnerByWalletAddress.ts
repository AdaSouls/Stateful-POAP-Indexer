import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerByWalletAddress } from "@game/db";
import type { GetOwnerByWalletAddressResponse, IErrorResponse } from "@game/utils";

@Route("get_owner_by_address")
export class GetOwnerByWalletAddressController extends Controller {
  @Get()
  public async get(
    @Query() walletAddress: string
  ): Promise<GetOwnerByWalletAddressResponse | IErrorResponse> {
    console.log("🚀 ~ GetOwnerByWalletAddressController ~ address:", walletAddress);
    const pool = requirePool();

    try {
      const owners = await getOwnerByWalletAddress.run({ walletAddress }, pool);
      console.log("🚀 ~ OwnerPoapsController ~ get ~ owner:", owners);
      const owner = owners[0] || null;
      return { owner } as GetOwnerByWalletAddressResponse;

    } catch (error: any) {
      console.error("❌ Error getting the owner:", error);
      return {
        error: 'Failed to get owner',
        details: error.message ?? error,
      };
    }

  }
}
