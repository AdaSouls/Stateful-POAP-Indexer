import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, createEvent, ICreateEventParams, ICreateEventResult } from '@game/db';

@Route('create_event')
export class CreateEventController extends Controller {
  @Post()
  public async post(@Body() eventInfo: ICreateEventParams): Promise<ICreateEventResult> {
    console.log("🚀 ~ CreateEventController ~ post ~ eventInfo:", eventInfo)
    const pool = requirePool();

    const event = await createEvent.run(
      eventInfo,
      pool
    );

    return event[0] as ICreateEventResult;
  }
}
