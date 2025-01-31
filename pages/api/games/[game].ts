import { getMongoClient } from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import mongoose from "mongoose";
import { schemaMap } from "../../../models/schemas";

const cors = Cors({
  methods: ["GET", "POST"],
  origin: "*",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const { game } = req.query;

  if (req.method === "GET") {
    try {
      const client = await getMongoClient();
      const db = client.db(process.env.DB);

      const collection = db.collection(game as string);
      const gameData = await collection.find({}).toArray();

      res.status(200).json(gameData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const gameData = req.body;

    if (!game || typeof game !== "string") {
      return res
        .status(400)
        .json({ error: "Game name is required in the URL" });
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
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
