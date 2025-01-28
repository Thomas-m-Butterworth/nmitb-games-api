import { getMongoClient } from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
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

export type MongoError = {
  message: string;
  code?: number;
  name?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  try {
    const client = await getMongoClient();
    const db = client.db(process.env.DB);

    const collections = await db.listCollections().toArray();
    const gamesData: Record<string, any> = {};

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), 9000)
    );

    const queryPromise = Promise.all(
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

    await Promise.race([queryPromise, timeoutPromise]);
    res.status(200).json(gamesData);
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
