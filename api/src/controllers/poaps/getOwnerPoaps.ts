import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getPoapsByOwnerAddress } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("owner_poaps")
export class GetOwnerPoapsController extends Controller {
  @Get()
  public async get(
    @Query() walletAddress: string
  ): Promise<{ poaps: any[] } | IErrorResponse> {
    console.log("🚀 ~ GetOwnerPoapsController ~ walletAddress:", walletAddress);
    const pool = requirePool();

    try {
      // Query POAPs directly with WHERE clause - much more efficient
      const ownerPoaps = await getPoapsByOwnerAddress.run(
        { ownerAddress: walletAddress },
        pool
      );
      console.log("🚀 ~ GetOwnerPoapsController ~ ownerPoaps:", ownerPoaps);
      
      return { poaps: ownerPoaps };
    } catch (error: any) {
      console.error("❌ Error getting owner POAPs:", error);
      return {
        error: 'Failed to get owner POAPs',
        details: error.message ?? error,
      };
    }
  }
}