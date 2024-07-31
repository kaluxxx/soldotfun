'use server'

import {findUserByWallet, updateUser} from "@/repository/user-repository";
import {UserDTO} from "@/types/dtos/userDTO";
import {User} from "@/types/entities/user";

export async function get(wallet: string) {
    try {
        return await findUserByWallet(wallet);
    } catch (e) {
        console.error(e);
    }
}

export async function update(userId: number, userDTO: UserDTO): Promise<User | undefined> {
    try {
        return await updateUser(userId, userDTO);
    } catch (e) {
        console.error(e);
    }
}