import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB);

    const collections = await db.listCollections().toArray();
    const gamesData: Record<string, any> = {};

    for (const collection of collections) {
      const collectionName = collection.name;
      const collectionData = await db
        .collection(collectionName)
        .find({})
        .toArray();
      gamesData[collectionName] = collectionData;
    }

    res.status(200).json(gamesData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
