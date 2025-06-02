/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateEventPoapRelationController } from './../controllers/eventPoaps/createEventPoapRelation';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateEventController } from './../controllers/events/createEvent';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AllEventsController } from './../controllers/events/getAllEvents';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LastEventController } from './../controllers/events/getLastEvent';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateEventController } from './../controllers/events/updateEvent';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateIssuerController } from './../controllers/issuers/createIssuer';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AllIssuersController } from './../controllers/issuers/getAllIssuers';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetIssuerByAddressController } from './../controllers/issuers/getIssuerByAddress';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetIssuerByUuidController } from './../controllers/issuers/getIssuerByUuid';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateOwnerController } from './../controllers/owners/createOwner';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AllOwnersController } from './../controllers/owners/getAllOwners';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetOwnerByAddressController } from './../controllers/owners/getOwnerByAddress';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetOwnerByUuidController } from './../controllers/owners/getOwnerByUuid';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OwnerPoapsController } from './../controllers/owners/ownerPoaps';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateOwnerController } from './../controllers/owners/updateOwner';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AllPoapsController } from './../controllers/poaps/getAllPoaps';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MintPoapController } from './../controllers/poaps/mintPoap';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdatePoapController } from './../controllers/poaps/updatePoap';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ICreateEventPoapParams": {
        "dataType": "refObject",
        "properties": {
            "eventUuid": {"dataType":"string","required":true},
            "poapUuid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateEventResult": {
        "dataType": "refObject",
        "properties": {
            "account": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "amountOfAttendees": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "approved": {"dataType":"string","required":true},
            "city": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "description": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "endDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventIdInContract": {"dataType":"double","required":true},
            "eventTemplateId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventType": {"dataType":"string","required":true},
            "eventUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventUuid": {"dataType":"string","required":true},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "image": {"dataType":"string","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "mintedPoaps": {"dataType":"double","required":true},
            "platform": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "poapsToBeMinted": {"dataType":"double","required":true},
            "poapType": {"dataType":"string","required":true},
            "privateEvent": {"dataType":"boolean","required":true},
            "purpose": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "requestedCodes": {"dataType":"double","required":true},
            "secretCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "startDate": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "virtualEvent": {"dataType":"boolean","required":true},
            "year": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DateOrString": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateEventParams": {
        "dataType": "refObject",
        "properties": {
            "account": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "amountOfAttendees": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "city": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "description": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "endDate": {"ref":"DateOrString","required":true},
            "eventTemplateId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "eventType": {"dataType":"string","required":true},
            "eventUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "expiryDate": {"ref":"DateOrString","required":true},
            "image": {"dataType":"string","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "platform": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "poapsToBeMinted": {"dataType":"double","required":true},
            "poapType": {"dataType":"string","required":true},
            "privateEvent": {"dataType":"boolean","required":true},
            "purpose": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "requestedCodes": {"dataType":"double","required":true},
            "secretCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "startDate": {"ref":"DateOrString","required":true},
            "title": {"dataType":"string","required":true},
            "virtualEvent": {"dataType":"boolean","required":true},
            "year": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetAllEventsResult": {
        "dataType": "refObject",
        "properties": {
            "account": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "amountOfAttendees": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "approved": {"dataType":"string","required":true},
            "city": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "description": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "endDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventIdInContract": {"dataType":"double","required":true},
            "eventTemplateId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventType": {"dataType":"string","required":true},
            "eventUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventUuid": {"dataType":"string","required":true},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "image": {"dataType":"string","required":true},
            "issuerIdInContract": {"dataType":"double","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "mintedPoaps": {"dataType":"double","required":true},
            "platform": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "poapsToBeMinted": {"dataType":"double","required":true},
            "poapType": {"dataType":"string","required":true},
            "privateEvent": {"dataType":"boolean","required":true},
            "purpose": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "requestedCodes": {"dataType":"double","required":true},
            "secretCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "startDate": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "virtualEvent": {"dataType":"boolean","required":true},
            "year": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetLastEventResult": {
        "dataType": "refObject",
        "properties": {
            "account": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "amountOfAttendees": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "approved": {"dataType":"string","required":true},
            "city": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "description": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "endDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventIdInContract": {"dataType":"double","required":true},
            "eventTemplateId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventType": {"dataType":"string","required":true},
            "eventUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventUuid": {"dataType":"string","required":true},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "image": {"dataType":"string","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "mintedPoaps": {"dataType":"double","required":true},
            "platform": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "poapsToBeMinted": {"dataType":"double","required":true},
            "poapType": {"dataType":"string","required":true},
            "privateEvent": {"dataType":"boolean","required":true},
            "purpose": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "requestedCodes": {"dataType":"double","required":true},
            "secretCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "startDate": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "virtualEvent": {"dataType":"boolean","required":true},
            "year": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LastEventResponse": {
        "dataType": "refObject",
        "properties": {
            "event": {"ref":"IGetLastEventResult","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateEventParams": {
        "dataType": "refObject",
        "properties": {
            "approved": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "eventIdInContract": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateIssuerResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"string","required":true},
            "issuerIdInContract": {"dataType":"double","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "organization": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateIssuerParams": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "organization": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetAllIssuersResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"string","required":true},
            "issuerIdInContract": {"dataType":"double","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "organization": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetIssuerByAddressResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"string","required":true},
            "issuerIdInContract": {"dataType":"double","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "organization": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetIssuerByAddressResponse": {
        "dataType": "refObject",
        "properties": {
            "issuer": {"ref":"IGetIssuerByAddressResult","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetIssuerByUuidResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"string","required":true},
            "issuerIdInContract": {"dataType":"double","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "organization": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateOwnerResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "ownerUuid": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateOwnerParams": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetAllOwnersResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "ownerUuid": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OwnerResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "ownerUuid": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetOwnerByAddressResponse": {
        "dataType": "refObject",
        "properties": {
            "owner": {"ref":"OwnerResult","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetOwnerByUuidResult": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "ownerUuid": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetOwnerPoapsResult": {
        "dataType": "refObject",
        "properties": {
            "account": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "amountOfAttendees": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "approved": {"dataType":"string","required":true},
            "city": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "description": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "endDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventIdInContract": {"dataType":"double","required":true},
            "eventTemplateId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventType": {"dataType":"string","required":true},
            "eventUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "eventUuid": {"dataType":"string","required":true},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "image": {"dataType":"string","required":true},
            "instance": {"dataType":"double","required":true},
            "issuerUuid": {"dataType":"string","required":true},
            "mintedPoaps": {"dataType":"double","required":true},
            "platform": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "poapcreatedat": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "poapsToBeMinted": {"dataType":"double","required":true},
            "poapType": {"dataType":"string","required":true},
            "poapUuid": {"dataType":"string","required":true},
            "privateEvent": {"dataType":"boolean","required":true},
            "purpose": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "relationcreatedat": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "relationUuid": {"dataType":"string","required":true},
            "requestedCodes": {"dataType":"double","required":true},
            "secretCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "startDate": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "virtualEvent": {"dataType":"boolean","required":true},
            "year": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OwnerPoapsResponse": {
        "dataType": "refObject",
        "properties": {
            "poaps": {"dataType":"array","array":{"dataType":"refObject","ref":"IGetOwnerPoapsResult"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateOwnerParams": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetAllPoapsResult": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "instance": {"dataType":"double","required":true},
            "ownerUuid": {"dataType":"string","required":true},
            "poapUuid": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreatePoapResult": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "instance": {"dataType":"double","required":true},
            "ownerUuid": {"dataType":"string","required":true},
            "poapUuid": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreatePoapParams": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
            "instance": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"void"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdatePoapParams": {
        "dataType": "refObject",
        "properties": {
            "ownerUuid": {"dataType":"string","required":true},
            "poapUuid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/create_event_poap_relation',
            ...(fetchMiddlewares<RequestHandler>(CreateEventPoapRelationController)),
            ...(fetchMiddlewares<RequestHandler>(CreateEventPoapRelationController.prototype.post)),

            async function CreateEventPoapRelationController_post(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    eventPoapRelationInfo: {"in":"body","name":"eventPoapRelationInfo","required":true,"ref":"ICreateEventPoapParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CreateEventPoapRelationController();

              await templateService.apiHandler({
                methodName: 'post',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/create_event',
            ...(fetchMiddlewares<RequestHandler>(CreateEventController)),
            ...(fetchMiddlewares<RequestHandler>(CreateEventController.prototype.post)),

            async function CreateEventController_post(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    eventInfo: {"in":"body","name":"eventInfo","required":true,"ref":"ICreateEventParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CreateEventController();

              await templateService.apiHandler({
                methodName: 'post',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_all_events',
            ...(fetchMiddlewares<RequestHandler>(AllEventsController)),
            ...(fetchMiddlewares<RequestHandler>(AllEventsController.prototype.getAll)),

            async function AllEventsController_getAll(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllEventsController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/last_event',
            ...(fetchMiddlewares<RequestHandler>(LastEventController)),
            ...(fetchMiddlewares<RequestHandler>(LastEventController.prototype.get)),

            async function LastEventController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LastEventController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/update_event',
            ...(fetchMiddlewares<RequestHandler>(UpdateEventController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateEventController.prototype.patch)),

            async function UpdateEventController_patch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    eventInfo: {"in":"body","name":"eventInfo","required":true,"ref":"IUpdateEventParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UpdateEventController();

              await templateService.apiHandler({
                methodName: 'patch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/create_issuer',
            ...(fetchMiddlewares<RequestHandler>(CreateIssuerController)),
            ...(fetchMiddlewares<RequestHandler>(CreateIssuerController.prototype.createIssuer)),

            async function CreateIssuerController_createIssuer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    issuerInfo: {"in":"body","name":"issuerInfo","required":true,"ref":"ICreateIssuerParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CreateIssuerController();

              await templateService.apiHandler({
                methodName: 'createIssuer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_all_issuers',
            ...(fetchMiddlewares<RequestHandler>(AllIssuersController)),
            ...(fetchMiddlewares<RequestHandler>(AllIssuersController.prototype.getAll)),

            async function AllIssuersController_getAll(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllIssuersController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_issuer_by_address',
            ...(fetchMiddlewares<RequestHandler>(GetIssuerByAddressController)),
            ...(fetchMiddlewares<RequestHandler>(GetIssuerByAddressController.prototype.get)),

            async function GetIssuerByAddressController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    address: {"in":"query","name":"address","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new GetIssuerByAddressController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_issuer_by_uuid',
            ...(fetchMiddlewares<RequestHandler>(GetIssuerByUuidController)),
            ...(fetchMiddlewares<RequestHandler>(GetIssuerByUuidController.prototype.get)),

            async function GetIssuerByUuidController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    issuerUuid: {"in":"query","name":"issuerUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new GetIssuerByUuidController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/create_owner',
            ...(fetchMiddlewares<RequestHandler>(CreateOwnerController)),
            ...(fetchMiddlewares<RequestHandler>(CreateOwnerController.prototype.post)),

            async function CreateOwnerController_post(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    ownerInfo: {"in":"body","name":"ownerInfo","required":true,"ref":"ICreateOwnerParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CreateOwnerController();

              await templateService.apiHandler({
                methodName: 'post',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_all_owners',
            ...(fetchMiddlewares<RequestHandler>(AllOwnersController)),
            ...(fetchMiddlewares<RequestHandler>(AllOwnersController.prototype.getAll)),

            async function AllOwnersController_getAll(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllOwnersController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_owner_by_address',
            ...(fetchMiddlewares<RequestHandler>(GetOwnerByAddressController)),
            ...(fetchMiddlewares<RequestHandler>(GetOwnerByAddressController.prototype.get)),

            async function GetOwnerByAddressController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    address: {"in":"query","name":"address","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new GetOwnerByAddressController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_owner_by_uuid',
            ...(fetchMiddlewares<RequestHandler>(GetOwnerByUuidController)),
            ...(fetchMiddlewares<RequestHandler>(GetOwnerByUuidController.prototype.get)),

            async function GetOwnerByUuidController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    ownerUuid: {"in":"query","name":"ownerUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new GetOwnerByUuidController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/owner_poaps',
            ...(fetchMiddlewares<RequestHandler>(OwnerPoapsController)),
            ...(fetchMiddlewares<RequestHandler>(OwnerPoapsController.prototype.get)),

            async function OwnerPoapsController_get(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    wallet: {"in":"query","name":"wallet","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new OwnerPoapsController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/update_owner',
            ...(fetchMiddlewares<RequestHandler>(UpdateOwnerController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateOwnerController.prototype.patch)),

            async function UpdateOwnerController_patch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    ownerInfo: {"in":"body","name":"ownerInfo","required":true,"ref":"IUpdateOwnerParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UpdateOwnerController();

              await templateService.apiHandler({
                methodName: 'patch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/get_all_poaps',
            ...(fetchMiddlewares<RequestHandler>(AllPoapsController)),
            ...(fetchMiddlewares<RequestHandler>(AllPoapsController.prototype.getAll)),

            async function AllPoapsController_getAll(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllPoapsController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/mint_poap',
            ...(fetchMiddlewares<RequestHandler>(MintPoapController)),
            ...(fetchMiddlewares<RequestHandler>(MintPoapController.prototype.post)),

            async function MintPoapController_post(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    mintPoapInfo: {"in":"body","name":"mintPoapInfo","required":true,"ref":"ICreatePoapParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MintPoapController();

              await templateService.apiHandler({
                methodName: 'post',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/update_poap',
            ...(fetchMiddlewares<RequestHandler>(UpdatePoapController)),
            ...(fetchMiddlewares<RequestHandler>(UpdatePoapController.prototype.patch)),

            async function UpdatePoapController_patch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    poapInfo: {"in":"body","name":"poapInfo","required":true,"ref":"IUpdatePoapParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UpdatePoapController();

              await templateService.apiHandler({
                methodName: 'patch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
