import { api } from "@/constants/common";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${req.query.appids}&l=korean&cc=kr`
    );
    const data = await result.json();
    console.log("detail server", data);
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
