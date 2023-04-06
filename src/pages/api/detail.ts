import { api } from "@/constants/common";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetch(
      `http://store.steampowered.com/api/appdetails?appids=${req.query.appids}`
    );
    const data = await result.json();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
