import { Controller, Get, Query, Route } from "tsoa";
import { 
  getEventsByOrganizer,
  IGetAllEventsResult, 
  requirePool 
} from "@game/db";
import { IErrorResponse } from "@game/utils";
import { sanitizeEvents } from "../../utils/eventSanitizer";

@Route("get_events_by_organizer")
export class GetEventsByOrganizerController extends Controller {
  @Get()
  public async getEventsByOrganizer(
    @Query() address: string
  ): Promise<IGetAllEventsResult[] | IErrorResponse> {
    const pool = requirePool();

    try {
      if (!address) {
        return {
          error: 'Missing required parameter',
          details: 'address parameter is required',
        };
      }

      const events = await getEventsByOrganizer.run(
        { organiserAddress: address },
        pool
      );
      
      // Remove null transaction_hash and block_number fields before sending to frontend
      return sanitizeEvents(events) as IGetAllEventsResult[];
    } catch (error: any) {
      console.error("❌ Error getting events by organizer:", error);
      return {
        error: 'Failed to get events by organizer',
        details: error.message ?? error,
      };
    }
  }
}

