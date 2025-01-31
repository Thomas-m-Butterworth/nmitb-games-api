import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import {
  deleteHandler,
  getHandler,
  postHandler,
  patchHandler,
  putHandler,
  runMiddleware,
  validateApiKey,
} from "./handlers";

const cors = Cors({
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  origin: "*",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  if (req.method !== "GET" && !validateApiKey(req, res)) {
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        await getHandler(req, res);
        break;
      case "POST":
        await postHandler(req, res);
        break;
      case "DELETE":
        await deleteHandler(req, res);
        break;
      case "PUT":
        await putHandler(req, res);
        break;
      case "PATCH":
        await patchHandler(req, res);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
