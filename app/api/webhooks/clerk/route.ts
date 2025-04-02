// import { Webhook } from "svix";
// import { NextRequest, NextResponse } from "next/server";
// import { storeUserIfNotExists } from "@/lib/storeUserInDb";
// import { WebhookEvent } from "@clerk/clerk-sdk-node";

// export async function POST(req: NextRequest) {
//     const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    
//     if (!WEBHOOK_SECRET) {
//         return NextResponse.json({ error: "Missing Clerk Webhook Secret" }, { status: 400 });
//     }

//     const payload = await req.text();
//     const headerPayload = req.headers;
//     const svixHeaders = {
//         "svix-id": headerPayload.get("svix-id") || "",
//         "svix-timestamp": headerPayload.get("svix-timestamp") || "",
//         "svix-signature": headerPayload.get("svix-signature") || "",
//     };

//     try {
//         // Verify Clerk webhook request
//         const wh = new Webhook(WEBHOOK_SECRET);
//         const event = wh.verify(payload, svixHeaders) as WebhookEvent;

//         if (event.type === "user.created") {
//             const { id, email_addresses, first_name, last_name } = event.data;

//             const userData = {
//                 _id: id, // Clerk User ID
//                 email: email_addresses[0]?.email_address,
//                 full_name: `${first_name || ""} ${last_name || ""}`.trim(),
//             };

//             await storeUserIfNotExists(userData);
//             console.log("✅ New Clerk User Stored in MongoDB:", userData);
//         }

//         return NextResponse.json({ message: "Success" }, { status: 200 });
//     } catch (err) {
//         console.error("❌ Clerk Webhook Verification Failed:", err);
//         return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
//     }
// }

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import createUser from '@/lib/actions/user.action';
import clerkClient from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
    const eventType = evt.type
    
    // create user in MongoDB
    if (eventType === 'user.created') {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        const user = {
            clerkId: id,
            email: email_addresses[0].email_address,
            username: username!,
            firstName: first_name,
            lastName: last_name,
            photo: image_url,
        };
        console.log(user);
        const newUser = await createUser(user);

        if (newUser) {
            await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: {
                    userId: newUser._id,
                }
            });
        }
        return NextResponse.json({ message: "New user created", user:newUser})
    }
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}