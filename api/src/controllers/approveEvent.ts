import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, ICreateOwnerParams, createOwner } from '@game/db';
import { randomUUID } from 'crypto';
import { approveEvent, IApproveEventParams } from '@game/db/src/update.queries';


@Route('approve_event')
export class ApproveEventController extends Controller {
  @Post()
  public async post(@Body() eventInfo: IApproveEventParams): Promise<string> {
    const pool = requirePool();

    const ownerToCreate = {
      eventUuid: eventInfo.eventUuid,
      approved: eventInfo.approved === "Approved" ? "Approved" : "Not Approved",
    }


    await approveEvent.run(
      {...ownerToCreate},
      pool
    );
    
    return eventInfo.eventUuid;
  }
}
