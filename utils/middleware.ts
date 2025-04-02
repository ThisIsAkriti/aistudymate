// import { auth } from "@clerk/nextjs/server";
// import { getDbConnection } from "@/lib/db";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function middleware(req: Request) {
//     try {
//         const { userId } = await auth();

//         if (!userId) {
//             console.log("❌ No user found in Clerk!");
//             return NextResponse.next();
//         }

//         console.log(`✅ Clerk UserID Retrieved: ${userId}`);

//         // Connect to MongoDB
//         await getDbConnection();

//         // Check if user exists in MongoDB
//         const existingUser = await User.findOne({ _id: userId });

//         if (existingUser) {
//             console.log("✅ User already exists in MongoDB.");
//             return NextResponse.next();
//         }

//         // ✅ Fetch user details from Clerk API
//         const clerkResponse = await fetch(
//             `https://api.clerk.com/v1/users/${userId}`, // Use `clerk.dev` for local dev
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//                 },
//             }
//         );

//         if (!clerkResponse.ok) {
//             console.error("❌ Error fetching user from Clerk API:", await clerkResponse.text());
//             return NextResponse.next();
//         }

//         const userData = await clerkResponse.json();

//         console.log("👤 Clerk User Data:", userData);

//         // ✅ Store user in MongoDB
//         const newUser = new User({
//             _id: userId,
//             email: userData.email_addresses?.[0]?.email_address || "no-email@example.com",
//             full_name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
//         });

//         await newUser.save();
//         console.log("✅ User stored in MongoDB!");

//     } catch (error) {
//         console.error("❌ Error storing user in MongoDB:", error);
//     }

//     return NextResponse.next();
// }
