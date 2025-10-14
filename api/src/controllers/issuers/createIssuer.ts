import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createIssuer, ICreateIssuerParams, ICreateIssuerResult } from '@game/db';
import { IErrorResponse } from "@game/utils";

@Route('create_issuer')
export class CreateIssuerController extends Controller {
  @Post()
  public async createIssuer(@Body() issuerInfo: ICreateIssuerParams): Promise<ICreateIssuerResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      const createIssuerRunAnswer = await createIssuer.run(
        issuerInfo,
        pool
      );
      return createIssuerRunAnswer[0];
    } catch (error: any) {
      console.error("❌ Error creating issuer:", error);
      return {
        error: 'Failed to create issuer',
        details: error.message ?? error,
      };
    }

  }
}
