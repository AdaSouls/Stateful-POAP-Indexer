import { Controller, Route, Post, Body } from "tsoa";
import { createPoap, ICreatePoapParams, ICreatePoapResult, requirePool } from "@game/db";

@Route("mint_poap")
export class MintPoapController extends Controller {
  @Post()
  public async post(@Body() mintPoapInfo: ICreatePoapParams): Promise<ICreatePoapResult> {
    const pool = requirePool();

    const [mintedPoap] = await createPoap.run(mintPoapInfo, pool);

    return mintedPoap;
  }
}
