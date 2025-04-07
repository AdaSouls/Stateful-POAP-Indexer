import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, ICreateOwnerParams, createOwner } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_owner')
export class CreateOwnerController extends Controller {
  @Post()
  public async post(@Body() ownerInfo: ICreateOwnerParams): Promise<string> {
    const pool = requirePool();
    const ownerUuid = randomUUID() as string

    const ownerToCreate = {
      ownerUuid,
      address: ownerInfo.address,
      email: ownerInfo?.email,
    }

    await createOwner.run(
      {...ownerToCreate},
      pool
    );
    
    return ownerUuid;
  }
}
