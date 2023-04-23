import { gameReviewScoreData } from "@/constants/common";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatMoney(amount: number) {
  const units = ["원", "만", "십만", "백만"];
  const unitDividers = [1, 10000, 100000, 1000000];
  let result = "";
  for (let i = unitDividers.length - 1; i >= 0; i--) {
    if (amount >= unitDividers[i]) {
      const unitAmount = Math.floor(amount / unitDividers[i]);
      result += unitAmount + units[i];
      amount %= unitDividers[i];
    }
  }
  return result;
}

const formatReviewIcon = (score: number) => {
  switch (score) {
    case 1:
      return "👎";
    case 2:
      return "🤬";
    case 3:
      return "😠";
    case 4:
      return "😒";
    case 5:
      return "😐";
    case 6:
      return "🙂";
    case 7:
      return "😄";
    case 8:
      return "👍";
    default:
      return "평가 부족";
  }
};

export { numberWithCommas, formatMoney, formatReviewIcon };
