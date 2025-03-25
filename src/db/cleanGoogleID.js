import { getDB } from "./db.js";

export async function resetGoogleIdIndex() {
    const db = getDB();
    try {
        await db.collection("users").dropIndex("googleId_1");
        console.log("Old googleId_1 index removed.");
    } catch (err) {
        console.log("No existing googleId_1 index to drop.");
    }

    await db.collection("users").createIndex(
        { googleId: 1 },
        { unique: true, sparse: true }
    );
    console.log("Recreated sparse unique index on googleId.");
}
