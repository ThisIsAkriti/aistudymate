'use server'

import User from "@/models/User";
import { getDbConnection } from "../db"

export default async function createUser(user: any) {
    try {
        await getDbConnection();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.error(error);
        console.log(error);
    }
}