# AdaSouls: Stateful POAPs Indexer
 
This documentation provides a basic overview of what are Stateful POAPs and how its indexer works. Each module has its own `README` file with more detailed information.

## Directory Structure

The project follows a specific directory structure to organize the code and resources effectively. Here's an overview of the important directories and files:

```
poap-indexer/
├── Stateful-POAP-Indexer/
│   ├── src/
│   │   ├── api/            # API routes and controllers
│   │   ├── gamelogic/      # Core game logic
│   │   ├── generated/      # Auto-generated files
│   │   ├── models/         # Data models
│   │   ├── queries/        # Database queries
│   │   └── utils/          # Helper utilities
│   ├── test/               # Test files
│   ├── package.json        # Project dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   ├── .env.example        # Example environment variables
│   └── README.md           # Project documentation
└── paima-engine-linux      # Paima Engine executable (parent directory)
```


## Installation

To install dependencies and perform initial setup, run the following command:

```
npm run initialize
```

This does the following:

- install dependencies of this template
- copies `.env.example` as `.env.localhost` to the parent folder

Additionally to other templates it does one more thing

- copies `extensions.yml` example to the parent folder

### MacOS specific

If you're using Mac and run into installation issues you can add `--target=esbuild-darwin-arm64` as a workaround to `npm install`. This installs the correct version of a problematic package. For example:

```
npm install --save-dev esbuild@latest --target=esbuild-darwin-arm64
```

## Building

To compile the Indexer into `endpoints` and `gameCode` entrypoints used by Paima Engine, to regenerate all `tsoa` routes (reflect changes in the `API`) and to start the `pgtyped` watcher process (if there are any changes to the DB schema or queries), use the following command:

```
npm run reset
```

This build ran all the Paima Engine internal commands to build everything we need.

## Prerequisites

Ensure that the `paima-engine-{linux|mac}` executable is located in the parent directory of this project. The directory structure should be as follows:

```
this-template
../paima-engine-linux
../.env
../extensions.yml
```

## Environment Setup

Config file `.env.localhost` is created during `npm run initialize` in the parent folder, based on `.env.example` in this project. This is an empty file that you need to fill in with your specific values, before running Paima Engine.

Feel free to use examples written in the file for initial testing.

## Database Setup

To speed up the development cycle you can at any time completely reset the database and start syncing from the latest blockheight. Run this command, that will modify your `.env.localhost` and `docker-compose.yml` files:

```
npm run database:reset
```

To start the database, run the command:

```
npm run database:up
```

## Run the Indexer

To run the Stateful POAPs Indexer, follow these steps:

1. Change to the parent directory where the packaged folder was generated:

```
cd ..
```

2. Execute the following command:

```
./paima-engine-linux run
```

You can set the `NETWORK` variable if you want to load a custom config for your Game Node. For example to load `.env.testnet` use:

```
NETWORK=testnet ./paima-engine-linux run
```

## Paimage Engine Documentation

If you've got this far you're probably already familiar with our documentation. But if you need to refresh your knowledge you can copy the documentation files to your file system by using the standalone CLI command:

```
./paima-engine-linux docs
```

Or you can visit our [Paima Documentation Website](docs.paimastudios.com) at any time.

#
#
# Developer's steps

## Build Commands

Our project uses several commands to compile and build different parts of the application. This should be done while all terminals (Local Blockchain if there is one for testing, DB and Paima Engine):

- **npm run compile:db**: Updates the database's queries and types using pgTyped, generating type-safe database query functions from SQL files in the queries directory. This ensures type safety between your database schema and TypeScript code.

- **npm run compile:api**: Updates the controllers used to post or get data from the database. This script regenerates API routes and controllers using the tsoa framework, creating OpenAPI documentation and type-safe route handlers.

- **npm run pack:middleware**: Builds the routing middleware that handles request routing to the different API endpoints. This compiles the middleware layer that sits between the client requests and your core application logic.

- **npm run pack**: Builds the entire workspace, compiling all TypeScript code and packaging the application for deployment. After running this command, you should reset the Paima Engine to ensure all changes are properly applied.


# POAP Indexer Implementation Steps

This document outlines the step-by-step process for implementing the Stateful POAP Indexer:

## Database Setup
1. **Create Database Schema**
  - Define tables in `/db/migrations/init/init.sql`

## Query Layer
2. **Implement SQL Operations**
  - Create SQL queries (select, insert, update, delete) in `/db/src/*.sql`

## Middleware Layer
3. **Establish API Endpoints**
  - Define endpoint constructors in `/middleware/src/helpers/query-constructors.ts`

4. **Create Query Functions**
  - Implement endpoint triggers in:
    - `/middleware/src/endpoints/queries.ts` (read operations)
    - `/middleware/src/endpoints/write.ts` (write operations)

5. **Develop Controllers**
  - Create controllers to handle data flow between routes

## Blockchain Integration
6. **Define Blockchain Events**
  - Configure event listeners in `/state-transition/src/stf/v1/parser.ts`

7. **Implement Event Processing**
  - Adapt the entrypoint function in `/state-transition/src/stf/v1/index.ts` to:
    - Identify blockchain events
    - Trigger appropriate functions for each event type

