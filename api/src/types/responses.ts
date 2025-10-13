/**
 * Local type definitions for API responses.
 * These mirror the database types but are defined locally so TSOA can analyze them.
 */

export interface ICreateIssuerResult {
    createdAt: Date | null;
    email: string | null;
    issuerAddress: string;
    issuerId: number;
    issuerUuid: string;
    organization: string | null;
    updatedAt: Date | null;
    username: string | null;
}

export interface ICreateEventResult {
    createdAt: Date | null;
    eventId: number;
    eventUuid: string;
    expiration: number;
    issuerId: number;
    maxSupply: number;
    organiserAddress: string;
    status: string;
    updatedAt: Date | null;
}

export interface ICreateOwnerResult {
    createdAt: Date | null;
    email: string | null;
    ownerAddress: string | null;
    ownerId: number;
    updatedAt: Date | null;
    username: string | null;
}

export interface ICreatePoapResult {
    createdAt: Date | null;
    eventId: number;
    issuerId: number;
    poapUuid: string;
    tokenId: number;
    updatedAt: Date | null;
}

export interface ICreateEventPoapResult {
    createdAt: Date | null;
    eventId: number;
    relationUuid: string;
    tokenId: number;
    updatedAt: Date | null;
}
