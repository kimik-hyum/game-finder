import ReviewCard from "@/components/ReviewCard";
import { ReviewData, ReviewType, ReviewContentType } from "@/query/app";
import { css } from "@emotion/react";

interface Props {
  data?: ReviewData;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Review({
  data,
  activeSection,
  setActiveSection,
}: Props) {
  const { cursor, query_summary, reviews } = data || {};
  return (
    <div css={S}>
      {reviews?.map((item: ReviewContentType, i: number) => {
        const { review, votes_up, voted_up, votes_funny, create_date } = item;
        return (
          <ReviewCard
            key={i}
            className={item.voted_up ? "postive" : "negative"}
            {...{ review, votes_up, voted_up, votes_funny, create_date }}
          />
        );
      })}
      <div
        className="center"
        onMouseEnter={() => setActiveSection("content")}
      />

      {/* <div className="postive"></div>
      <div className="negative"></div> */}
    </div>
  );
}

const S = css`
  position: relative;
  display: flex;
  flex-direction: column;
  .center {
    position: fixed;
    top: 100px;
    height: 100%;
    width: calc(100vw - 60vw);
    left: 50%;
    transform: translateX(-50%);
  }
`;
