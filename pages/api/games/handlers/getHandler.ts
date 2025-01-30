import { getMongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await getMongoClient();
  const db = client.db(process.env.DB);

  const collections = await db.listCollections().toArray();
  const gamesData: Record<string, any> = {};

  await Promise.all(
    collections.map(async (collection) => {
      const collectionName = collection.name;
      const collectionData = await db
        .collection(collectionName)
        .find({})
        .limit(100)
        .toArray();
      gamesData[collectionName] = collectionData;
    })
  );

  res.status(200).json(gamesData);
};
