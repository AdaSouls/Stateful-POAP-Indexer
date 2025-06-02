import { Controller, Route, Post, Body } from 'tsoa';
import { requirePool, ICreateOwnerParams, createOwner, ICreateOwnerResult } from '@game/db';
import { randomUUID } from 'crypto';


@Route('create_owner')
export class CreateOwnerController extends Controller {
  @Post()
  public async post(@Body() ownerInfo: ICreateOwnerParams): Promise<ICreateOwnerResult> {
    const pool = requirePool();

    const ownerToCreate = {
      address: ownerInfo.address,
      email: ownerInfo?.email,
    }

    const newOwner = await createOwner.run(
      {...ownerToCreate},
      pool
    );
    
    return newOwner[0];
  }
}
