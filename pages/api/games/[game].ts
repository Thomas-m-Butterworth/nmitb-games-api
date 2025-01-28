import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { game } = req.query;

  try {
    const client = await clientPromise; // Use the cached connection
    const db = client.db(process.env.DB);

    // Check if the collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    if (!collectionNames.includes(game as string)) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    // Fetch data from the specific collection
    const collection = db.collection(game as string);
    const gameData = await collection.find({}).toArray();

    res.status(200).json(gameData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
