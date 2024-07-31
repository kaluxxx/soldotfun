import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('user')
        .addColumn('bio', 'text')
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('user')
        .dropColumn('bio')
        .execute();
}
