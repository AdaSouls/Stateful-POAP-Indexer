import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createEvent, ICreateEventParams, ICreateEventResult } from '@game/db';
import { IErrorResponse } from "@game/utils";

/**
 * TSOA-compatible interface for creating events
 * Includes all required and optional fields
 */
export interface ICreateEventRequest {
  /** Issuer ID (required) */
  issuerId: number;
  /** Event ID (required) */
  eventId: number;
  /** Maximum supply of POAPs for this event (required) */
  eventMaxSupply: number;
  /** Mint expiration timestamp in seconds, 0 for indefinite (required) */
  eventMintExpiration: number;
  /** Organizer wallet address (required) */
  eventOrganizer: string;
  /** Event title/name (optional) */
  title?: string;
  /** Event description (optional) */
  description?: string;
  /** URL to event image/banner (optional) */
  imageUrl?: string;
  /** Event start date/time in ISO format (optional) */
  eventStartDate?: string;
  /** Event end date/time in ISO format (optional) */
  eventEndDate?: string;
}

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
  public async post(@Body() eventInfo: ICreateEventRequest): Promise<ICreateEventResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      // Convert ICreateEventRequest to ICreateEventParams for database
      const eventParams: ICreateEventParams = {
        issuerId: eventInfo.issuerId,
        eventId: eventInfo.eventId,
        eventMaxSupply: eventInfo.eventMaxSupply,
        eventMintExpiration: eventInfo.eventMintExpiration,
        eventOrganizer: eventInfo.eventOrganizer,
        title: eventInfo.title || null,
        description: eventInfo.description || null,
        imageUrl: eventInfo.imageUrl || null,
        eventStartDate: eventInfo.eventStartDate || null,
        eventEndDate: eventInfo.eventEndDate || null,
      };
      
      const event = await createEvent.run(
        eventParams,
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
