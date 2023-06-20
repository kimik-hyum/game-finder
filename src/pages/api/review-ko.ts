import { api } from "@/constants/common";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetch(
      `https://store.steampowered.com/appreviews/${req.query.appids}?json=1&language=korean&l=korean`
    );
    const data = await result.json();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
