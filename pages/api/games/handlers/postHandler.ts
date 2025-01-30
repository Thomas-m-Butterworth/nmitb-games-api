import { getMongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const client = await getMongoClient();
  const db = client.db(process.env.DB);

  const gameData = req.body;
  const collectionName = gameData.collectionName;
  const result = await db.collection(collectionName).insertOne(gameData);

  res.status(201).json(result);
};
