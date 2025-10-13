import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerByWalletAddress } from "@game/db";
import type { GetOwnerByWalletAddressResponse } from "@game/utils";

@Route("get_owner_by_address")
export class GetOwnerByWalletAddressController extends Controller {
  @Get()
  public async get(
    @Query() walletAddress: string
  ): Promise<GetOwnerByWalletAddressResponse> {
    console.log("🚀 ~ GetOwnerByWalletAddressController ~ address:", walletAddress);
    const pool = requirePool();

    const owners = await getOwnerByWalletAddress.run({ walletAddress }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ owner:", owners);
    const owner = owners[0] || null;
    return { owner } as GetOwnerByWalletAddressResponse;
  }
}
