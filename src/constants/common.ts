const api = process.env.API;
const isClient = typeof window !== "undefined";
const pageSize = 30;
const gameReviewScoreData = [
  {
    label: "압도적으로 부정적",
    value: "Overwhelmingly Negative",
    color: "ff5044",
    score: 1,
  },
  { label: "매우 부정적", value: "Very Negative", color: "e55946", score: 2 },
  {
    label: "대체로 부정적",
    value: "Mostly Negative",
    color: "d25f48",
    score: 3,
  },
  { label: "부정적", value: "Negative", color: "b3694b", score: 4 },
  { label: "복합적", value: "Mixed", color: "96734e", score: 5 },
  { label: "긍정적", value: "Positive", color: "757e51", score: 6 },
  {
    label: "대체로 긍정적",
    value: "Mostly Positive",
    color: "4f8b55",
    score: 7,
  },
  { label: "매우 긍정적", value: "Very Positive", color: "329558", score: 8 },
  {
    label: "압도적으로 긍정적",
    value: "Overwhelmingly Positive",
    color: "11a05b",
    score: 9,
  },
];

export { api, isClient, gameReviewScoreData, pageSize };
