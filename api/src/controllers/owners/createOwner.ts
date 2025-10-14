import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createOwner, ICreateOwnerParams, ICreateOwnerResult } from '@game/db';
import { IErrorResponse } from '@game/utils';

@Route('create_owner')
export class CreateOwnerController extends Controller {
  @Post()
  public async post(@Body() ownerInfo: ICreateOwnerParams): Promise<ICreateOwnerResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {

      const ownerToCreate = {
        email: ownerInfo.email || null,
        ownerAddress: ownerInfo.ownerAddress,
        username: ownerInfo.username || null,
      }

      const newOwner = await createOwner.run(
        { ...ownerToCreate },
        pool
      );

      return newOwner[0];

    } catch (error: any) {
      console.error("❌ Error creating owner:", error);
      return {
        error: 'Failed to create owner',
        details: error.message ?? error,
      };
    }
  }
}
