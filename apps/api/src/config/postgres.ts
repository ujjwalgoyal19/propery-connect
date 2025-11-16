import { Pool, PoolConfig } from 'pg';

import { log } from '@/utils/logger';

import { env } from './env';

/**
 * PostgreSQL connection pool configuration
 * Uses connection pooling for optimal performance and resource management
 */
const poolConfig: PoolConfig = {
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
};

/**
 * PostgreSQL connection pool
 * Automatically manages database connections for optimal performance
 */
const pool = new Pool(poolConfig);

// Handle pool errors
pool.on('error', (err) => {
  log.error(`Unexpected error on idle PostgreSQL client: ${err.message}`);
  process.exit(-1);
});

// Log successful connection in development
pool.on('connect', () => {
  if (env.NODE_ENV === 'development') {
    log.info('PostgreSQL client connected');
  }
});

/**
 * Execute a query with automatic connection management
 * @param text SQL query string
 * @param params Query parameters (prevents SQL injection)
 * @returns Query result
 */
export const query = async (text: string, params?: unknown[]) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (env.NODE_ENV === 'development') {
      log.info(`Query executed in ${duration}ms - ${result.rowCount} rows`);
    }

    return result;
  } catch (error) {
    log.error(`Database query error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

/**
 * Get a client from the pool for transaction support
 * Remember to call client.release() when done!
 */
export const getClient = () => pool.connect();

/**
 * Close all connections in the pool
 * Should be called when shutting down the application
 */
export const closePool = async () => {
  await pool.end();
  log.info('PostgreSQL pool closed');
};

export default pool;
