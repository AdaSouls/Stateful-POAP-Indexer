import type {
  ICreateEventParams,
  ICreatePoapParams,
  DateOrString,
  // IApproveEventParams,
} from "@game/db";
import { createEvent, createPoap } from "@game/db";
import { updateEvent } from "@game/db/src/update.queries";
import type { SQLUpdate } from "@paima/node-sdk/db";

// this file deals with receiving blockchain data input and outputting SQL updates (imported from pgTyped output of our SQL files)
// PGTyped SQL updates are a tuple of the function calling the database and the params sent to it.

// export function persistIssuerCreate(
//   address: WalletAddress,
//   email: string,
//   name: string,
//   organization: string
// ): SQLUpdate {
//   const params: ICreateIssuerParams = {
//     address,
//     email,
//     name,
//     organization,
//   };
//   return [createIssuer, params];
// }

export function persistEventCreate(
  description: string,
  email: string,
  endDate: DateOrString,
  eventType: string,
  expiryDate: DateOrString,
  image: string,
  issuerUuid: string,
  poapsToBeMinted: number,
  poapType: string,
  privateEvent: boolean,
  requestedCodes: number,
  startDate: DateOrString,
  title: string,
  virtualEvent: boolean,
  year: number,
  account?: string | null | void,
  amountOfAttendees?: number | null | void,
  city?: string | null | void,
  country?: string | null | void,
  eventTemplateId?: string | null | void,
  eventUrl?: string | null | void,
  platform?: string | null | void,
  purpose?: string | null | void,
  secretCode?: string | null | void
): SQLUpdate {
  const params: ICreateEventParams = {
    description,
    email,
    endDate,
    eventType,
    expiryDate,
    image,
    issuerUuid,
    poapsToBeMinted,
    poapType,
    privateEvent,
    requestedCodes,
    startDate,
    title,
    virtualEvent,
    year,
    account,
    amountOfAttendees,
    city,
    country,
    eventTemplateId,
    eventUrl,
    platform,
    purpose,
    secretCode,
  };
  return [createEvent, params];
}

export function persistUpdateEvent(eventIdInContract: number): SQLUpdate {
  const params = {
    eventIdInContract,
    approved: "Approved",
  };
  return [updateEvent, params];
}

export function persistPoapCreate(
  address: string,
  instance: number
): SQLUpdate {
  console.log("🚀 ~ instance:", instance);
  console.log("🚀 ~ address:", address);
  const params: ICreatePoapParams = {
    address: address,
    instance,
  };
  console.log("🚀 ~ params:", params);
  return [createPoap, params];
}
