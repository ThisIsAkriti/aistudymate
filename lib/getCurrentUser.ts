import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { storeUserIfNotExists } from "@/lib/storeUserInDb";

export async function getCurrentUser() {
    const { userId} = await auth();

    if (!userId) {
        console.error("❌ No user found in Clerk!");
        return null;
    }
    const user = await clerkClient.users.getUser(userId);
    console.log(`✅ Clerk UserID Retrieved: ${userId}`);
    
    await storeUserIfNotExists({
        _id: userId,
        email: user?.emailAddresses[0]?.emailAddress || "",
        full_name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
      });
    return userId;
}
