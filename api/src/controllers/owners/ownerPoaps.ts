import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerPoaps, IGetOwnerPoapsParams } from "@game/db";
import type { OwnerPoapsResponse } from "@game/utils";

@Route("owner_poaps")
export class OwnerPoapsController extends Controller {
  @Get()
  public async get(@Query() ownerAddress: string): Promise<OwnerPoapsResponse> {
    const pool = requirePool();

    const userPoaps = await getOwnerPoaps.run({ ownerAddress }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ userPoaps:", userPoaps);
    return { poaps: userPoaps };
  }
}
