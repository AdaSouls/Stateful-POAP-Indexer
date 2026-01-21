import { Controller, Get, Route, Path } from "tsoa";
import { requirePool, getPoapByTokenId } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("get_poap")
export class GetPoapByTokenIdController extends Controller {
  @Get("/:tokenId")
  public async get(
    @Path() tokenId: number
  ): Promise<any[] | IErrorResponse> {
    console.log("🚀 ~ GetPoapByTokenIdController ~ tokenId:", tokenId);
    const pool = requirePool();

    try {
      // NOTE: tokenId is NOT unique, so this returns an array of POAPs
      const poaps = await getPoapByTokenId.run({ tokenId }, pool);
      console.log("🚀 ~ GetPoapByTokenIdController ~ poaps:", poaps);
      
      // Return array even if empty or single result
      return poaps;
    } catch (error: any) {
      console.error("❌ Error getting POAP by tokenId:", error);
      return {
        error: 'Failed to get POAP by tokenId',
        details: error.message ?? error,
      };
    }
  }
}





