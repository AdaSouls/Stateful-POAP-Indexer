import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, createEvent, ICreateEventParams, ICreateEventResult } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_event')
export class CreateEventController extends Controller {
  @Post()
  public async post(@Body() eventInfo: ICreateEventParams): Promise<ICreateEventResult> {
    console.log("🚀 ~ CreateEventController ~ post ~ eventInfo:", eventInfo)
    const pool = requirePool();

      // account?: string | null | void;
      // amountOfAttendees?: number | null | void;
      // city?: string | null | void;
      // country?: string | null | void;
      // description: string;
      // email: string;
      // endDate: DateOrString;
      // eventTemplateId?: string | null | void;
      // eventType: string;
      // eventUrl?: string | null | void;
      // expiryDate: DateOrString;
      // image: string;
      // issuerUuid: string;
      // platform?: string | null | void;
      // poapsToBeMinted: number;
      // poapType: string;
      // privateEvent: boolean;
      // purpose?: string | null | void;
      // requestedCodes: number;
      // secretCode?: string | null | void;
      // startDate: DateOrString;
      // title: string;
      // virtualEvent: boolean;
      // year: number;

    // const eventToCreate = {
    //   city: eventInfo.city,
    //   country: eventInfo.country,
    //   description: eventInfo.description,
    //   email: eventInfo.email,
    //   eventUrl: eventInfo.eventUrl,
    //   expiryDate: eventInfo.expiryDate,
    //   issuerUuid: eventInfo.issuerUuid,
    //   poapsToBeMinted: eventInfo.poapsToBeMinted,
    //   requestedCodes: eventInfo.requestedCodes,
    //   title: eventInfo.title,
    // }

    const event = await createEvent.run(
      eventInfo,
      pool
    );
    
    return event[0] as ICreateEventResult;
  }
}
