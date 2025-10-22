import { Controller, Route, Post, Body } from 'tsoa';
import { requirePoolWriteAccess, createIssuer, ICreateIssuerParams, ICreateIssuerResult } from '@game/db';
import { IErrorResponse } from "@game/utils";

interface ICreateIssuerRequest {
  address: string;
  email: string;
  name: string;
  organization: string;
}

@Route('create_issuer')
export class CreateIssuerController extends Controller {
  @Post()
  public async createIssuer(@Body() issuerInfo: ICreateIssuerRequest): Promise<ICreateIssuerResult | IErrorResponse> {
    const pool = requirePoolWriteAccess();

    try {
      // Generate a unique issuerId that fits within PostgreSQL INTEGER range
      // Using a combination of timestamp (seconds) and random component
      const timestamp = Math.floor(Date.now() / 1000); // Convert to seconds
      const random = Math.floor(Math.random() * 1000); // 3-digit random number
      const issuerId = timestamp + random; // Combine them
      // const issuerId = 2001;
      
      const issuerToCreate: ICreateIssuerParams = {
        issuerId: issuerId,
        issuerAddress: issuerInfo.address,
        username: issuerInfo.name,
        email: issuerInfo.email,
        organization: issuerInfo.organization,
      };

      const createIssuerRunAnswer = await createIssuer.run(
        issuerToCreate,
        pool
      );
      return createIssuerRunAnswer[0];
    } catch (error: any) {
      console.error("❌ Error creating issuer:", error);
      
      // Set the HTTP status code to indicate an error
      this.setStatus(400); // Bad Request
      
      return {
        error: 'Failed to create issuer',
        details: error.message ?? error,
      };
    }

  }
}
