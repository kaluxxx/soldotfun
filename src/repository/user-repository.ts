import { db } from '@/db/database'
import {NewUser, User, UserUpdate} from "@/db/types/user-table";

export async function findUserById(id: number): Promise<User | undefined> {
    return await db.selectFrom('user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function findUserByWallet(wallet: string): Promise<User | undefined> {
    const user =  await db.selectFrom('user')
        .where('wallet', '=', wallet)
        .selectAll()
        .executeTakeFirst()
    console.log('Found user:', user);
    return user;
}

export async function updateUser(id: number, updateWith: UserUpdate): Promise<User> {
    console.log('Updating user with id:', id, 'with:', updateWith);
    await db.updateTable('user').set(updateWith).where('id', '=', id).execute()
    const updatedUser = await findUserById(id);
    return updatedUser!;
}

export async function createUser(user: NewUser): Promise<User> {
    const newUser = await db.insertInto('user')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow()
    console.log('Created user:', newUser);

    return newUser;
}

export async function deleteUser(id: number): Promise<User | undefined> {
    return await db.deleteFrom('user').where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}