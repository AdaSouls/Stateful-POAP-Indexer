import { Controller, Get, Query, Route, Post, Body } from 'tsoa';
import { requirePool, createEvent, ICreateEventParams } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_event')
export class CreateEventController extends Controller {
  @Post()
  public async post(@Body() eventInfo: ICreateEventParams): Promise<string> {
    const pool = requirePool();
    const eventUuid = randomUUID() as string

    const eventToCreate = {
      city: eventInfo.city,
      country: eventInfo.country,
      description: eventInfo.description,
      email: eventInfo.email,
      eventUuid,
      expiryDate: eventInfo.expiryDate,
      issuerUuid: eventInfo.issuerUuid,
      poapsToBeMinted: eventInfo.poapsToBeMinted,
      requestedCodes: eventInfo.requestedCodes,
      title: eventInfo.title,
      eventUrl: eventInfo.eventUrl,
    }

    await createEvent.run(
      {...eventToCreate},
      pool
    );
    
    return eventUuid;
  }
}
