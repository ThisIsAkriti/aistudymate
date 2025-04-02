import { getDbConnection } from "./db";
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

export default async function getSummaries(userId:string) {
    const sql = await getDbConnection();

    const validUserId = validateUUID(userId) ? userId : uuidv4();

    const existingUser = await sql`SELECT id FROM users WHERE id = ${validUserId} LIMIT 1`;

    if (existingUser.length === 0) {
        console.log(`Inserting new user with ID: ${validUserId}`);
        await sql`INSERT INTO users (id, email) VALUES (
            ${validUserId},
            'default@example.com'
        )`;
    }

    // Fetch summaries using the correctly validated user ID
    const summaries = await sql`SELECT * FROM pdf_summaries WHERE user_id = ${validUserId} ORDER BY created_at DESC`;
    
    return summaries;
}