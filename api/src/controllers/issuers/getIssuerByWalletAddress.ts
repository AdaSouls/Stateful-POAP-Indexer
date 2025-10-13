import { Controller, Get, Query, Route } from "tsoa";
import { requirePool, getIssuerByWalletAddress } from "@game/db";

interface IGetIssuerByWalletAddressResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

interface GetIssuerByWalletAddressResponse {
  issuer: IGetIssuerByWalletAddressResult;
}

@Route("get_issuer_by_address")
export class GetIssuerByWalletAddressController extends Controller {
  @Get()
  public async get(
    @Query() walletAddress: string
  ): Promise<GetIssuerByWalletAddressResponse> {
    console.log("🚀 ~ GetIssuerByWalletAddressController ~ address:", walletAddress);
    const pool = requirePool();

    const issuers = await getIssuerByWalletAddress.run({ walletAddress }, pool);
    console.log("🚀 ~ OwnerPoapsController ~ get ~ issuer:", issuers);
    const issuer = issuers[0] || null;
    return { issuer } as GetIssuerByWalletAddressResponse;
  }
}
