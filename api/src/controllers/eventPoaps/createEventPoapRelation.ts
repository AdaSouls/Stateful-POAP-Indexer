import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, createEventPoap, ICreateEventPoapParams } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_event_poap_relation')
export class CreateEventPoapRelationController extends Controller {
  @Post()
  public async post(@Body() eventPoapRelationInfo: ICreateEventPoapParams): Promise<string> {
    const pool = requirePool();
    const relationUuid = randomUUID() as string

    const eventPoapRelationToCreate = {
      relationUuid,
      eventUuid: eventPoapRelationInfo.eventUuid,
      poapUuid: eventPoapRelationInfo.poapUuid
    }

    await createEventPoap.run(
      {...eventPoapRelationToCreate},
      pool
    );
    
    return relationUuid;
  }
}
