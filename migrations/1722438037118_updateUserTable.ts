import type {Kysely} from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // set unique constraint on wallet column
    await db.schema
        .alterTable('user')
        .addUniqueConstraint('unique_wallet', ['wallet'])
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('user')
        .dropConstraint('unique_wallet')
        .execute();
}
