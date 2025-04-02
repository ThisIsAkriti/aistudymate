import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { storeUserIfNotExists } from "@/lib/storeUserInDb";

export async function getCurrentUser() {
    const { userId} = await auth();

    if (!userId) {
        console.error("❌ No user found in Clerk!");
        return null;
    }

    console.log(`✅ Clerk UserID Retrieved: ${userId}`);
    
    await storeUserIfNotExists(userId); // Save user in MongoDB
    return userId;
}
