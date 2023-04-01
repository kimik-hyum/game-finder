import { api } from "@/constants/common";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetch(`${api}/apps`);
    const list = await result.json();
    res.status(200).json({ list });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
