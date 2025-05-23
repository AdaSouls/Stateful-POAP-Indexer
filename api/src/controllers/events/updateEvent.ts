import { Controller, Route, Patch, Body } from "tsoa";
import { requirePool, ICreateOwnerParams, createOwner } from "@game/db";
import { randomUUID } from "crypto";
import { updateEvent, IUpdateEventParams } from "@game/db/src/update.queries";

@Route("update_event")
export class UpdateEventController extends Controller {
  @Patch()
  public async patch(@Body() eventInfo: IUpdateEventParams): Promise<string> {
    const pool = requirePool();

    const ownerToCreate = {
      eventIdInContract: eventInfo.eventIdInContract,
      approved: eventInfo.approved === "Approved" ? "Approved" : "Not Approved",
    };

    const updatedEvent = await updateEvent.run({ ...ownerToCreate }, pool);

    console.log("🚀 ~ UpdateEventController ~ post ~ updatedEvent:", updatedEvent)
    return eventInfo.approved === "Approved" ? "Approved" : "Not Approved";
  }
}
