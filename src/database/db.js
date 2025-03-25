// module of mongodb
import { MongoClient } from 'mongodb';
// dotenv file to protect sensitive information in database
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.ATLAS_URI);
let db;

export async function connectToMongoClient() {
    try {
        await client.connect();
        db=client.db(); // default database
        console.log("Connected to MongoDB...");
    } catch (err) {
        console.error("Failed to connect to MongoDB...");
    }
}

export function getDB() {
    if (!db) {
        throw new Error("MongoDB is not connected yet.");
    }
    return db;
}
