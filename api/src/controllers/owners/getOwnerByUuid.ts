import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getOwnerByUuid, IGetOwnerByUuidResult } from "@game/db";

@Route("get_owner_by_uuid")
export class GetOwnerByUuidController extends Controller {
  @Get()
  public async get(
    @Query() ownerUuid: string
  ): Promise<IGetOwnerByUuidResult> {
    console.log("🚀 ~ GetOwnerByUuidController ~ ownerUuid:", ownerUuid)
    const pool = requirePool();

    const owners = await getOwnerByUuid.run({ ownerUuid }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ owner:", owners);

    return owners[0];
  }
}
