import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";

export const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await getMongoClient();
  const db = client.db(process.env.DB);

  const { collectionName, id, data } = req.body;
  const idString = id.toString();

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const result = await db
    .collection(collectionName)
    .replaceOne({ _id: ObjectId.createFromHexString(idString) }, data);

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Document not found" });
    return;
  }

  res.status(200).json(result);
};
