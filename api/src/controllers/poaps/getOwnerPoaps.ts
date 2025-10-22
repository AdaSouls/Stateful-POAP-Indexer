import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getAllPoaps } from "@game/db";
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
      // Get all POAPs and filter by owner address
      const allPoaps = await getAllPoaps.run(undefined, pool);
      console.log("🚀 ~ GetOwnerPoapsController ~ allPoaps:", allPoaps);
      
      // Filter by wallet address
      const ownerPoaps = allPoaps.filter(poap => 
        poap.ownerAddress && poap.ownerAddress.toLowerCase() === walletAddress.toLowerCase()
      );
      
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