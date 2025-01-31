import { getMongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { schemaMap } from "@/models/schemas";

export const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const client = await getMongoClient();
  const db = client.db(process.env.DB);

  const gameData = req.body;
  const { collectionName, ...data } = gameData;

  if (!schemaMap[collectionName]) {
    return res
      .status(400)
      .json({ error: `Invalid collection: ${collectionName}` });
  }

  try {
    const SchemaModel = mongoose.model(
      collectionName,
      schemaMap[collectionName]
    );
    await new SchemaModel(data).validate();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res
      .status(400)
      .json({ error: "Invalid data", details: errorMessage });
  }

  try {
    const result = await db.collection(collectionName).insertOne(data);
    res.status(201).json(result);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Database error", details: errorMessage });
  }
};
