import ReviewCard from "@/components/ReviewCard";
import { ReviewData, ReviewType, ReviewContentType } from "@/query/app";
import { css } from "@emotion/react";

interface Props {
  data?: ReviewData;
}

export default function Review({ data }: Props) {
  const { cursor, query_summary, reviews } = data || {};
  return (
    <div css={S}>
      {reviews?.map((item: ReviewContentType, i: number) => {
        return <ReviewCard key={i}>{item.review}</ReviewCard>;
      })}

      {/* <div className="postive"></div>
      <div className="negative"></div> */}
    </div>
  );
}

const S = css`
  display: flex;
  flex-direction: column;
`;
