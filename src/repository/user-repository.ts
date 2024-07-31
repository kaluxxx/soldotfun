import {db} from '@/db/database'
import {NewUser, User, UserUpdate} from "@/db/types/user-table";

async function findUserById(id: number): Promise<User | undefined> {
    return await db.selectFrom('user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

async function findUserByWallet(wallet: string): Promise<User | undefined> {
    return await db.selectFrom('user')
        .where('wallet', '=', wallet)
        .selectAll()
        .executeTakeFirst();
}

async function updateUser(id: number, updateWith: UserUpdate): Promise<User> {
    await db.updateTable('user').set(updateWith).where('id', '=', id).execute()
    const updatedUser = await findUserById(id);
    return updatedUser!;
}

async function updateUserImage(id: number, image: string): Promise<User> {
    return await db.updateTable('user').set({image: image}).where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow();
}

async function createUser(user: NewUser): Promise<User> {
    return await db.insertInto('user')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow();
}

async function deleteUser(id: number): Promise<User | undefined> {
    return await db.deleteFrom('user').where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export const userRepository = {
    findUserById,
    findUserByWallet,
    updateUser,
    updateUserImage,
    createUser,
    deleteUser
}