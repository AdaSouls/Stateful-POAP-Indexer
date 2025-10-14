import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createPoap, ICreatePoapParams, ICreatePoapResult } from '@game/db';
import { IErrorResponse } from "@game/utils";

@Route('create_poap')
export class CreatePoapController extends Controller {
  @Post()
  public async post(@Body() poapInfo: ICreatePoapParams): Promise<ICreatePoapResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      const poap = await createPoap.run(
        poapInfo,
        pool
      );

      return poap[0] as ICreatePoapResult;

    } catch (error: any) {
      console.error("❌ Error creating poap:", error);
      return {
        error: 'Failed to create poap',
        details: error.message ?? error,
      };
    }

  }
}
