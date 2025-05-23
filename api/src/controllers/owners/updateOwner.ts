import { Controller, Route, Patch, Body } from "tsoa";
import { requirePool } from "@game/db";
import { updateOwner, IUpdateOwnerParams } from "@game/db/src/update.queries";

@Route("update_owner")
export class UpdateOwnerController extends Controller {
  @Patch()
  public async patch(@Body() ownerInfo: IUpdateOwnerParams): Promise<string> {
    const pool = requirePool();

    const updatedOwner = await updateOwner.run(ownerInfo, pool);

    console.log(
      "🚀 ~ UpdateOwnerController ~ post ~ updatedOwner:",
      updatedOwner
    );
    return updatedOwner
      ? "Owner updated successfully"
      : "Failed to update owner";
  }
}
