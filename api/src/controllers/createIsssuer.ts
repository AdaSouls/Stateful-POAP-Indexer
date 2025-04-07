
import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, ICreateIssuerParams, createIssuer } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_issuer')
export class CreateIssuerController extends Controller {
  @Post()
  public async post(@Body() issuerInfo: ICreateIssuerParams): Promise<string> {
    const pool = requirePool();
    const issuerUuid = randomUUID() as string

    const issuerToCreate = {
      issuerUuid,
      address: issuerInfo.address,
      name: issuerInfo.name,
      email: issuerInfo.email,
      organization: issuerInfo.organization
    }

    await createIssuer.run(
      {...issuerToCreate},
      pool
    );
    
    return issuerUuid;
  }
}
