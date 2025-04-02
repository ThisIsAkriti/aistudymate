import User from "@/models/User";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { getDbConnection } from "./db";

export async function storeUserIfNotExists(userData: { _id: string; email: string; full_name: string }) {
    try {
        await getDbConnection();

        const existingUser = await User.findById(userData._id);


        if (existingUser) {
            console.log("✅ User already exists in MongoDB.");
            return;
        }
        console.log("❌ User not found in MongoDB, fetching from Clerk...");
        // Fetch user details from Clerk
        
        const newUser = new User(userData);

        await newUser.save();
        console.log("✅ User stored in MongoDB!");

    } catch (error) {
        console.error("❌ Error saving user to MongoDB:", error);
    }
}
