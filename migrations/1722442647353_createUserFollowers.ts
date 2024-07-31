import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('userFollowers')
        .addColumn('follower_id', 'integer', col => col.notNull().references('user.id'))
        .addColumn('following_id', 'integer', col => col.notNull().references('user.id'))
        .addPrimaryKeyConstraint('pk_user_followers', ['follower_id', 'following_id'])
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable('userFollowers')
        .execute();
}