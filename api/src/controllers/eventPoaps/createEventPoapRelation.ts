import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, createEventPoap, ICreateEventPoapParams, ICreateEventPoapResult } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_event_poap_relation')
export class CreateEventPoapRelationController extends Controller {
  @Post()
  public async post(@Body() eventPoapRelationInfo: ICreateEventPoapParams): Promise<ICreateEventPoapResult> {
    const pool = requirePool();


    const [relation] = await createEventPoap.run(
      {...eventPoapRelationInfo},
      pool
    );
    
    return relation;
  }
}
