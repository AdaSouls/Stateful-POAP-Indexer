import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createEvent, ICreateEventParams, ICreateEventResult, getEventByEventId, updateEventMetadata } from '@game/db';
import { IErrorResponse } from "@game/utils";
import { sanitizeEvent } from "../../utils/eventSanitizer";

/**
 * TSOA-compatible interface for creating events
 * Includes all required and optional fields
 */
export interface ICreateEventRequest {
  /** Issuer ID (required) */
  issuerId: number;
  /** Event ID (optional - will be auto-generated if not provided) */
  eventId?: number;
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
  /** Event start date as Unix timestamp in seconds (optional, same type as expiration) */
  eventStartDate?: number;
  /** Event end date/time in ISO format (optional) */
  eventEndDate?: string;
}

/**
 * Controller for creating POAP events.
 * 
 * Accepts both on-chain data (required) and off-chain metadata (optional):
 * - On-chain: issuerId, eventMaxSupply, eventMintExpiration, eventOrganizer
 * - On-chain (optional): eventId (auto-generated if not provided)
 * - Off-chain: title, description, imageUrl, eventStartDate, eventEndDate
 */
@Route('create_event')
export class CreateEventController extends Controller {
  @Post()
  public async post(@Body() eventInfo: ICreateEventRequest): Promise<ICreateEventResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      // If eventId is not provided, generate it using the sequence
      let finalEventId: number;
      if (!eventInfo.eventId) {
        const result = await pool.query('SELECT nextval(\'events_eventId_seq\') as "eventId"');
        finalEventId = parseInt(result.rows[0].eventId, 10);
        console.log(`✅ Auto-generated eventId: ${finalEventId}`);
      } else {
        finalEventId = eventInfo.eventId;
        console.log(`✅ Using provided eventId: ${finalEventId}`);
      }

      // Convert ICreateEventRequest to ICreateEventParams for database
      const eventParams: ICreateEventParams = {
        issuerId: eventInfo.issuerId,
        eventId: finalEventId,
        eventMaxSupply: eventInfo.eventMaxSupply,
        eventMintExpiration: eventInfo.eventMintExpiration,
        eventOrganizer: eventInfo.eventOrganizer,
        title: eventInfo.title || null,
        description: eventInfo.description || null,
        imageUrl: eventInfo.imageUrl || null,
        eventStartDate: eventInfo.eventStartDate,
        eventEndDate: eventInfo.eventEndDate || null,
      };
      
      const event = await createEvent.run(
        eventParams,
        pool
      );

      // If event already exists (ON CONFLICT DO NOTHING returns empty array), update off-chain data
      if (!event || event.length === 0 || !event[0]) {
        // Update off-chain metadata for existing event
        await updateEventMetadata.run(
          {
            eventId: finalEventId,
            title: eventInfo.title || null,
            description: eventInfo.description || null,
            imageUrl: eventInfo.imageUrl || null,
            eventStartDate: eventInfo.eventStartDate,
            eventEndDate: eventInfo.eventEndDate || null,
          },
          pool
        );
        
        // Fetch and return the updated event
        const existingEvent = await getEventByEventId.run(
          { eventId: finalEventId },
          pool
        );
        
        if (existingEvent && existingEvent.length > 0) {
          // Remove null transaction_hash and block_number fields before sending to frontend
          return sanitizeEvent(existingEvent[0] as ICreateEventResult) as ICreateEventResult;
        } else {
          // This shouldn't happen, but handle it gracefully
          return {
            error: 'Failed to create or update event',
            details: 'Event not found after update attempt',
          };
        }
      }

      // Return newly created event (remove null transaction_hash and block_number fields)
      return sanitizeEvent(event[0] as ICreateEventResult) as ICreateEventResult;

    } catch (error: any) {
      console.error("❌ Error creating event:", error);
      return {
        error: 'Failed to create event',
        details: error.message ?? error,
      };
    }

  }
}
