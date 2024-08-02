import {Kysely, sql} from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createType('project_status')
        .asEnum(['incoming', 'live'])
        .execute();

    await db.schema
        .createTable('project')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar(255)', (col) => col.notNull())
        .addColumn('ticker', 'varchar(10)', (col) => col.notNull())
        .addColumn('description', 'text', (col) => col.notNull())
        .addColumn('image', 'varchar(255)', (col) => col.notNull())
        .addColumn('initialMarketCap', 'varchar(255)', (col) => col.notNull())
        .addColumn('initialSupply', 'varchar(255)', (col) => col.notNull())
        .addColumn('marketCap', 'varchar(255)')
        .addColumn('status', sql`project_status`, (col) => col.notNull().defaultTo('incoming'))
        .addColumn('userId', 'integer', (col) => col.notNull().references('user.id'))
        .addColumn('createdAt', 'date', (col) => col.defaultTo('now()'))
        .addColumn('updatedAt', 'date', (col) => col.defaultTo('now()'))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('project').execute();

    await db.schema.dropType('project_status').execute();
}