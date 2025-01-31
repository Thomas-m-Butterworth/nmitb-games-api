import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { getMongoClient } from "../../../lib/mongodb";
import {
  patchHandler,
  putHandler,
  deleteHandler,
  postHandler,
} from "./handlers";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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

  if (typeof game !== "string") {
    return res.status(400).json({ error: "Game name is required in the URL" });
  }

  if (req.method === "GET") {
    try {
      const client = await getMongoClient();
      const db = client.db(process.env.DB);

      const collection = db.collection(game);
      const gameData = await collection.find({}).toArray();

      res.status(200).json(gameData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    await postHandler(req, res, game);
  } else if (req.method === "PUT") {
    await putHandler(req, res, game);
  } else if (req.method === "PATCH") {
    await patchHandler(req, res, game);
  } else if (req.method === "DELETE") {
    await deleteHandler(req, res, game);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
