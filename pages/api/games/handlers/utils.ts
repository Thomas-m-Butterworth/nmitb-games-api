import { NextApiRequest, NextApiResponse } from "next";

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const validateApiKey = (req: NextApiRequest, res: NextApiResponse) => {
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
