import { ObjectId } from "mongodb";
import { getMongoClient } from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "DELETE"],
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

const validateApiKey = (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = process.env.TRUSTED_API_KEY;

  if (req.method === "GET") {
    return true;
  }

  if (apiKey === validApiKey) {
    return true;
  } else {
    res.status(403).json({ error: "Forbidden: Invalid API key" });
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  if (req.method !== "GET" && !validateApiKey(req, res)) {
    return;
  }

  try {
    const client = await getMongoClient();
    const db = client.db(process.env.DB);

    if (req.method === "GET") {
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
    } else if (req.method === "POST") {
      const gameData = req.body;
      const collectionName = gameData.collectionName;
      const result = await db.collection(collectionName).insertOne(gameData);
      res.status(201).json(result);
    } else if (req.method === "DELETE") {
      const { collectionName, id } = req.body;
      const idString = id.toString();

      if (!ObjectId.isValid(idString)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const result = await db
        .collection(collectionName)
        .deleteOne({ _id: ObjectId.createFromHexString(id) });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Document not found" });
        return;
      }

      res.status(200).json(result);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
