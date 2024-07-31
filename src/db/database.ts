import { Database } from './types/db'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.POSTGRES_URL,
    })
})

export const db = new Kysely<Database>({
    dialect,
})