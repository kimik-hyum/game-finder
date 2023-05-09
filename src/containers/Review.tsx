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
        return (
          <ReviewCard
            key={i}
            className={item.voted_up ? "postive" : "negative"}
          >
            {item.review}
          </ReviewCard>
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
  .review-card {
    width: 30vw;
    min-width: 150px;
    max-width: 600px;

    &.negative {
      background: #307252;
      margin-left: auto;
    }
    &.postive {
      background: #307252;
    }
  }
`;
