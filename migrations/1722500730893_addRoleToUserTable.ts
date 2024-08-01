import {Kysely, sql} from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createType('user_role')
        .asEnum(['admin', 'moderator', 'user'])
        .execute();

    await db.schema
        .alterTable('user')
        .addColumn('role', sql`user_role`, col => col.notNull().defaultTo('user'))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('user')
        .dropColumn('role')
        .execute();

    await db.schema
        .dropType('userRole')
        .execute();
}