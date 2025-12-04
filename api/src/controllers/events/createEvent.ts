import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createEvent, ICreateEventParams, ICreateEventResult } from '@game/db';
import { IErrorResponse } from "@game/utils";

/**
 * Controller for creating POAP events.
 * 
 * Accepts both on-chain data (required) and off-chain metadata (optional):
 * - On-chain: issuerId, eventId, eventMaxSupply, eventMintExpiration, eventOrganizer
 * - Off-chain: title, description, imageUrl, eventStartDate, eventEndDate
 */
@Route('create_event')
export class CreateEventController extends Controller {
  @Post()
  public async post(@Body() eventInfo: ICreateEventParams): Promise<ICreateEventResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      // ICreateEventParams includes optional off-chain fields:
      // title, description, imageUrl, eventStartDate, eventEndDate
      const event = await createEvent.run(
        eventInfo,
        pool
      );

      return event[0] as ICreateEventResult;

    } catch (error: any) {
      console.error("❌ Error creating event:", error);
      return {
        error: 'Failed to create event',
        details: error.message ?? error,
      };
    }

  }
}
