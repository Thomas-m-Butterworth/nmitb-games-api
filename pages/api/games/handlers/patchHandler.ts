import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";

export const patchHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  game: string
) => {
  const client = await getMongoClient();
  const db = client.db(process.env.DB);

  const { id, data } = req.body;
  const idString = id.toString();

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const result = await db
    .collection(game)
    .updateOne({ _id: ObjectId.createFromHexString(idString) }, { $set: data });

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Document not found" });
    return;
  }

  res.status(200).json(result);
};
