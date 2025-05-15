import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerPoaps } from "@game/db";
import type { OwnerPoapsResponse } from "@game/utils";

@Route("owner_poaps")
export class OwnerPoapsController extends Controller {
  @Get()
  public async get(@Query() wallet: string): Promise<OwnerPoapsResponse> {
    const pool = requirePool();
    wallet = wallet.toLowerCase();

    const userPoaps = await getOwnerPoaps.run({ address: wallet }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ userPoaps:", userPoaps);
    return { poaps: userPoaps };
  }
}
