import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    
        try {
            const database = client.db('youraisutdymate');
            const movies = database.collection('users');
            // Query for a movie that has the title 'Back to the Future'
            const query = {  };
            const movie = await movies.find(query).toArray();
            console.log(movie);
            return NextResponse.json({ name: 'Akriti', movie });
            
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
}