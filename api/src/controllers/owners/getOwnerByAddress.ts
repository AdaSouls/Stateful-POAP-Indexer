import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerByAddress } from "@game/db";
import type { GetOwnerByAddressResponse } from "@game/utils";

@Route("get_owner_by_address")
export class GetOwnerByAddressController extends Controller {
  @Get()
  public async get(
    @Query() address: string
  ): Promise<GetOwnerByAddressResponse> {
    console.log("🚀 ~ GetOwnerByAddressController ~ address:", address);
    const pool = requirePool();

    const owners = await getOwnerByAddress.run({ address }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ owner:", owners);
    const owner = owners[0] || null;
    return { owner } as GetOwnerByAddressResponse;
  }
}
