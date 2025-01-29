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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const { game } = req.query;

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
}
