import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
        .createTable('user')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('wallet', 'text', (col) => col.notNull())
        .addColumn('username', 'text', (col) => col.notNull())
        .addColumn('image', 'text', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
        .dropTable('user')
        .execute()
}
