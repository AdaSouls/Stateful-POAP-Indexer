import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getPoapsByOwnerAddress } from "@game/db";
import { IErrorResponse } from "@game/utils";

@Route("owner_poaps")
export class GetOwnerPoapsController extends Controller {
  @Get()
  public async get(
    @Query() ownerAddress: string
  ): Promise<{ poaps: any[] } | IErrorResponse> {
    console.log("🚀 ~ GetOwnerPoapsController ~ ownerAddress:", ownerAddress);
    const pool = requirePool();

    try {
      // Query POAPs with event details
      const ownerPoaps = await getPoapsByOwnerAddress.run(
        { ownerAddress: ownerAddress },
        pool
      );
      console.log("🚀 ~ GetOwnerPoapsController ~ ownerPoaps:", ownerPoaps);
      
      // Format POAPs with nested event data
      const formattedPoaps = ownerPoaps.map((poap: any) => {
        const {
          eventUuid,
          event_issuerId,
          title,
          description,
          imageUrl,
          maxSupply,
          organiserAddress,
          status,
          totalSupply,
          eventStartDate,
          eventEndDate,
          expiration,
          event_createdAt,
          event_updatedAt,
          event_block_number,
          event_transaction_hash,
          ...poapData
        } = poap;

        // Build event object if event data exists (check eventId as eventUuid might be null)
        const event = (eventUuid || poapData.eventId) ? {
          eventUuid: eventUuid || null,
          issuerId: event_issuerId || poapData.issuerId,
          eventId: poapData.eventId,
          title: title || null,
          description: description || null,
          image: imageUrl || null,
          imageUrl: imageUrl || null,
          maxSupply: maxSupply || null,
          organiserAddress: organiserAddress || null,
          status: status || null,
          totalSupply: totalSupply || null,
          eventStartDate: eventStartDate || null,
          eventEndDate: eventEndDate || null,
          expiration: expiration || null,
          createdAt: event_createdAt || null,
          updatedAt: event_updatedAt || null,
          block_number: event_block_number || null,
          transaction_hash: event_transaction_hash || null,
          // Calculate if expired
          isExpired: expiration ? Math.floor(Date.now() / 1000) > expiration : false,
        } : null;

        return {
          ...poapData,
          events: event ? [event] : [],
        };
      });
      
      return { poaps: formattedPoaps };
    } catch (error: any) {
      console.error("❌ Error getting owner POAPs:", error);
      return {
        error: 'Failed to get owner POAPs',
        details: error.message ?? error,
      };
    }
  }
}