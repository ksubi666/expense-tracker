import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

export const db = new pg.Pool({
  ssl:true,
  connectionString:process.env.NEONDB_CONNECTION_STRING
})