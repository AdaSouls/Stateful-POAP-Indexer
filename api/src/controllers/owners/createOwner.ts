import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, createOwner } from '@game/db';

type ICreateOwnerParams = {
  email?: string | null | void;
  ownerAddress: string;
  username?: string | null | void;
};

interface ICreateOwnerResult {
  createdAt: Date | null;
  email: string | null;
  ownerAddress: string | null;
  ownerId: number;
  updatedAt: Date | null;
  username: string | null;
}

@Route('create_owner')
export class CreateOwnerController extends Controller {
  @Post()
  public async post(@Body() ownerInfo: ICreateOwnerParams): Promise<ICreateOwnerResult> {
    const pool = requirePool();

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
  }
}
