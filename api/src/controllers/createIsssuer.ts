import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, ICreateIssuerParams, createIssuer } from '@game/db';


@Route('create_issuer')
export class CreateIssuerController extends Controller {
  @Post()
  public async createIssuer(@Body() issuerInfo: ICreateIssuerParams): Promise<string> {
    console.log("🚀 ~ CreateIssuerController ~ createIssuer blabla ~ issuerInfo:", issuerInfo)
    const pool = requirePool();
    // const issuerUuid = randomUUID() as string

    // const issuerToCreate = {
    //   address: issuerInfo.address,
    //   name: issuerInfo.name,
    //   issuerUuid,
    //   email: issuerInfo.email,
    //   organization: issuerInfo.organization
    // }

    // console.log("🚀 ~ CreateIssuerController ~ createIssuer ~ issuerToCreate:", issuerToCreate)
    

    const createIssuerRunAnswer = await createIssuer.run(
      issuerInfo,
      pool
    );
    console.log("🚀 ~ CreateIssuerController ~ createIssuer ~ createIssuerRunAnswer:", createIssuerRunAnswer)
    
    return createIssuerRunAnswer[0].issuerUuid;
  }
}
