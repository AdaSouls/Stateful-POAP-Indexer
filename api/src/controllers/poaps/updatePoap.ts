import { Controller, Route, Patch, Body } from "tsoa";
import { requirePool } from "@game/db";
import { updatePoap, IUpdatePoapParams } from "@game/db/src/update.queries";

@Route("update_poap")
export class UpdatePoapController extends Controller {
  @Patch()
  public async patch(@Body() poapInfo: IUpdatePoapParams): Promise<string> {
    const pool = requirePool();

    const updatedPoap = await updatePoap.run(poapInfo, pool);

    console.log(
      "🚀 ~ UpdatePoapController ~ post ~ updatedPoap:",
      updatedPoap
    );
    return updatedPoap
      ? "Poap updated successfully"
      : "Failed to update poap";
  }
}
