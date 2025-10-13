import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, createIssuer } from '@game/db';

interface ICreateIssuerParams {
  issuerAddress: string;
  issuerId: number;
}

interface ICreateIssuerResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

@Route('create_issuer')
export class CreateIssuerController extends Controller {
  @Post()
  public async createIssuer(@Body() issuerInfo: ICreateIssuerParams): Promise<ICreateIssuerResult> {
    console.log("🚀 ~ CreateIssuerController ~ createIssuer blabla ~ issuerInfo:", issuerInfo)
    const pool = requirePool();

    const createIssuerRunAnswer = await createIssuer.run(
      issuerInfo,
      pool
    );
    console.log("🚀 ~ CreateIssuerController ~ createIssuer ~ createIssuerRunAnswer:", createIssuerRunAnswer)

    return createIssuerRunAnswer[0];
  }
}
