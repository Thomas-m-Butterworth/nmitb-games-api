import { MongoError } from "mongodb";
import { getMongoClient } from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { game } = req.query;

  try {
    const client = await getMongoClient();
    const db = client.db(process.env.DB);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), 9000)
    );

    const queryPromise = (async () => {
      const collection = db.collection(game as string);
      return await collection.find({}).toArray();
    })();

    const gameData = await Promise.race([queryPromise, timeoutPromise]);
    res.status(200).json(gameData);
  } catch (error) {
    const mongoError = error as MongoError;
    console.error("Error:", mongoError);
    if (mongoError.message === "Query timeout") {
      res.status(504).json({ error: "Request timeout" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
