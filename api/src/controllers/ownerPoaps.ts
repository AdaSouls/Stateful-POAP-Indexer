import { Controller, Get, Query, Route } from 'tsoa';
import { requirePool, getOwnerPoaps } from '@game/db';
import { getAllOwnedNfts } from '@paima/node-sdk/utils-backend';
import type { OwnerPoapsResponse } from '@game/utils';

@Route('owner_poaps')
export class OwnerPoapsController extends Controller {
  @Get()
  public async get(@Query() wallet: string): Promise<OwnerPoapsResponse> {
    const pool = requirePool();
    wallet = wallet.toLowerCase();

    const nfts = await getAllOwnedNfts(pool, wallet);

    if (nfts.length === 0) {
      return { poaps: [] };
    }

    const userPoaps = await getOwnerPoaps.run(
      // { poaps: nfts.map(nft => parseInt(nft.tokenId.toString())) },
      {address: wallet},
      pool
    );
    return { poaps: userPoaps };
  }
}
