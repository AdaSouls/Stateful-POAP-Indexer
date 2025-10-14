import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createEventPoap, ICreateEventPoapParams, ICreateEventPoapResult } from '@game/db';
import { IErrorResponse } from '@game/utils';

@Route('create_event_poap')
export class CreateEventPoapController extends Controller {
  @Post()
  public async post(@Body() eventPoapInfo: ICreateEventPoapParams): Promise<ICreateEventPoapResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      const [eventPoap] = await createEventPoap.run(
        { ...eventPoapInfo },
        pool
      );

      return eventPoap;
    } catch (error: any) {
      console.error("❌ Error creating event_poap:", error);
      return {
        error: 'Failed to create event_poap',
        details: error.message ?? error,
      };
    }


  }
}
