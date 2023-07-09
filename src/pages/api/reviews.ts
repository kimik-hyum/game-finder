import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cursor = req.query.cursor as string;
    const { id, filter } = req.query;
    const result = await fetch(
      `https://store.steampowered.com/appreviews/${id}?json=1&filter=${filter}&num_per_page=${
        filter === "all" ? 100 : 20
      }&cursor=${(cursor && encodeURIComponent(cursor)) || "*"}&l=korean`
    );
    let review = await result.json();
    if (review.success === 1 && !review.reviews.length) {
      const globalResult = await fetch(
        `https://store.steampowered.com/appreviews/${id}?json=1&language=all&filter=${filter}&num_per_page=${
          filter === "all" ? 100 : 20
        }&cursor=${(cursor && encodeURIComponent(cursor)) || "*"}`
      );
      review = await globalResult.json();
    }
    res.status(200).json({ review });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
