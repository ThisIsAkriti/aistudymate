import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { storeUserIfNotExists } from "@/lib/storeUserInDb";
import { WebhookEvent } from "@clerk/clerk-sdk-node";

export async function POST(req: NextRequest) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Missing Clerk Webhook Secret" }, { status: 400 });
    }

    const payload = await req.text();
    const headerPayload = req.headers;
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id") || "",
        "svix-timestamp": headerPayload.get("svix-timestamp") || "",
        "svix-signature": headerPayload.get("svix-signature") || "",
    };

    try {
        // Verify Clerk webhook request
        const wh = new Webhook(WEBHOOK_SECRET);
        const event = wh.verify(payload, svixHeaders) as WebhookEvent;

        if (event.type === "user.created") {
            const { id, email_addresses, first_name, last_name } = event.data;

            const userData = {
                _id: id, // Clerk User ID
                email: email_addresses[0]?.email_address,
                full_name: `${first_name || ""} ${last_name || ""}`.trim(),
            };

            await storeUserIfNotExists(userData);
            console.log("✅ New Clerk User Stored in MongoDB:", userData);
        }

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        console.error("❌ Clerk Webhook Verification Failed:", err);
        return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }
}
