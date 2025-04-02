import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("❌ MongoDB connection string (MONGO_URI) is missing in environment variables!");
}

export async function getDbConnection() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ MongoDB already connected.");
            return;
        }

        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI, {
            dbName: "summaries"
        });

        console.log("✅ Successfully connected to MongoDB!");
    } catch (err) {
        console.error("❌ MongoDB connection failed!", err);
    }
}
