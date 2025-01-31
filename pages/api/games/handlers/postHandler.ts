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

  const { game } = req.query;
  const gameData = req.body;

  if (!game || typeof game !== "string") {
    return res.status(400).json({ error: "Game name is required in the URL" });
  }

  if (!schemaMap[game]) {
    return res.status(400).json({ error: `Invalid collection: ${game}` });
  }

  try {
    const SchemaModel = mongoose.model(game, schemaMap[game]);
    await new SchemaModel(gameData).validate();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res
      .status(400)
      .json({ error: "Invalid data", details: errorMessage });
  }

  try {
    const client = await getMongoClient();
    const db = client.db(process.env.DB);
    const result = await db.collection(game).insertOne(gameData);

    res.status(201).json(result);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Database error", details: errorMessage });
  }
};
