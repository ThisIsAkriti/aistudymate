import { getDbConnection } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        await getDbConnection();
        const { name, email } = await request.json();

        const newUser = new User({
            name, email
        });
        console.log("hey this is usersRoute.ts")
        console.log(newUser);
        
        await newUser.save();
        return NextResponse.json(newUser, { status: 201 });
    } catch (err) {
        console.log(err);
    }
}