import type { Pool } from 'pg';
import { getConnection } from '@paima/node-sdk/db';
/**
 * Pool of Postgres connections to avoid overhead of connecting on every request.
 */

export const creds = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

let pool: Pool | null;

/**
 * Function to get access to the readonly DB pool.
 * creds argument is ignored after initial (paima-engine internal) setup.
 * @returns readonly DB connection
 */
export function requirePool(): Pool {
  if (!pool) {
    pool = getConnection(creds, true);
  }
  return pool as Pool;
}

/**
 * Function to get access to the DB pool to write.
 * creds argument is ignored after initial (paima-engine internal) setup.
 * @returns write DB connection
 */
export function requirePoolWriteAccess(): Pool {
  if (!pool) {
    pool = getConnection(creds, false);
  }
  return pool as Pool;
}
