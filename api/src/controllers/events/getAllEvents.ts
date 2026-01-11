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
    /** Search events by event ID (partial match, case-insensitive) */
    @Query() eventIdSearch?: string,
    /** Search events by title (partial match, case-insensitive) */
    @Query() titleSearch?: string,
    /** Filter by calculated status: 'pending', 'active', 'expired', 'completed' */
    @Query() calculatedStatus?: string,
    /** Filter by minimum event start date (Unix timestamp in seconds) */
    @Query() eventStartDateMin?: number,
    /** Filter by maximum event start date (Unix timestamp in seconds) */
    @Query() eventStartDateMax?: number,
    /** Filter by minimum expiration date (Unix timestamp in seconds) */
    @Query() expirationMin?: number,
    /** Filter by maximum expiration date (Unix timestamp in seconds) */
    @Query() expirationMax?: number,
    /** Filter by minimum max supply */
    @Query() maxSupplyMin?: number,
    /** Filter by maximum max supply */
    @Query() maxSupplyMax?: number,
    /** Filter by minimum total supply */
    @Query() totalSupplyMin?: number,
    /** Filter by maximum total supply */
    @Query() totalSupplyMax?: number,
    /** Field to sort by: 'createdAt', 'eventStartDate', 'expiration', 'title', 'maxSupply', 'totalSupply' */
    @Query() sortBy?: string,
    /** Sort order: 'asc' or 'desc' */
    @Query() order?: string
  ): Promise<IGetAllEventsResult[] | IErrorResponse> {
    const pool = requirePool();

    try {
      // Check if any filters are provided
      const hasFilters = organiserAddress || eventIdSearch || titleSearch || 
                        calculatedStatus || eventStartDateMin !== undefined || 
                        eventStartDateMax !== undefined || expirationMin !== undefined || 
                        expirationMax !== undefined || maxSupplyMin !== undefined || 
                        maxSupplyMax !== undefined || totalSupplyMin !== undefined || 
                        totalSupplyMax !== undefined || sortBy || order;

      // If no filters/sort params provided, use simple getAllEvents
      if (!hasFilters) {
        const events = await getAllEvents.run(undefined, pool);
        // Only return events with transaction_hash
        return filterEventsWithTransactionHash(events) as IGetAllEventsResult[];
      }

      // Use filtered query
      const filterParams = {
        organiserAddress: organiserAddress || null,
        eventIdSearch: eventIdSearch || null,
        titleSearch: titleSearch || null,
        calculatedStatus: calculatedStatus || null,
        eventStartDateMin: eventStartDateMin !== undefined ? eventStartDateMin : null,
        eventStartDateMax: eventStartDateMax !== undefined ? eventStartDateMax : null,
        expirationMin: expirationMin !== undefined ? expirationMin : null,
        expirationMax: expirationMax !== undefined ? expirationMax : null,
        maxSupplyMin: maxSupplyMin !== undefined ? maxSupplyMin : null,
        maxSupplyMax: maxSupplyMax !== undefined ? maxSupplyMax : null,
        totalSupplyMin: totalSupplyMin !== undefined ? totalSupplyMin : null,
        totalSupplyMax: totalSupplyMax !== undefined ? totalSupplyMax : null,
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
