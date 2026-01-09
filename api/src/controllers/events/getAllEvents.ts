import { Controller, Get, Query, Route } from "tsoa";
import { 
  getAllEvents, 
  getEventsWithFilters,
  IGetAllEventsResult, 
  IGetEventsWithFiltersResult,
  requirePool 
} from "@game/db";
import { IErrorResponse } from "@game/utils";
import { filterEventsWithTransactionHash } from "../../utils/eventSanitizer";

@Route("get_all_events")
export class AllEventsController extends Controller {
  @Get()
  public async getAll(
    /** Filter by organizer wallet address */
    @Query() organiserAddress?: string,
    /** Filter by event ID */
    @Query() eventId?: number,
    /** Filter by event status (e.g., 'Pending', 'Active', 'Completed') */
    @Query() status?: string,
    /** Filter by expiration status: 'true' for expired, 'false' for active */
    @Query() expired?: string,
    /** Search events by title (partial match, case-insensitive) */
    @Query() titleSearch?: string,
    /** Field to sort by: 'createdAt', 'eventStartDate', 'expiration', 'title' */
    @Query() sortBy?: string,
    /** Sort order: 'asc' or 'desc' */
    @Query() order?: string
  ): Promise<IGetAllEventsResult[] | IErrorResponse> {
    const pool = requirePool();

    try {
      // Convert expired string to boolean if provided
      let expiredBool: boolean | null = null;
      if (expired !== undefined && expired !== null && expired !== '') {
        expiredBool = expired.toLowerCase() === 'true';
      }

      // Check if any filters are provided
      const hasFilters = organiserAddress || eventId !== undefined || status || 
                        expiredBool !== null || titleSearch || sortBy || order;

      // If no filters/sort params provided, use simple getAllEvents
      if (!hasFilters) {
        const events = await getAllEvents.run(undefined, pool);
        // Only return events with transaction_hash
        return filterEventsWithTransactionHash(events) as IGetAllEventsResult[];
      }

      // Use filtered query
      const filterParams = {
        organiserAddress: organiserAddress || null,
        eventId: eventId !== undefined ? eventId : null,
        status: status || null,
        expired: expiredBool,
        titleSearch: titleSearch || null,
        sortBy: sortBy || null,
        order: order || 'desc',
      };

      const events = await getEventsWithFilters.run(filterParams, pool);
      // Only return events with transaction_hash
      return filterEventsWithTransactionHash(events) as IGetAllEventsResult[];
    } catch (error: any) {
      console.error("❌ Error getting all events:", error);
      return {
        error: 'Failed to get events',
        details: error.message ?? error,
      };
    }
  }
}
