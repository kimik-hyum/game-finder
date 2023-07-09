import ReviewCard from "@/components/ReviewCard";
import {
  ReviewData,
  ReviewType,
  ReviewContentType,
  useInfiniteReviewQuery,
} from "@/query/app";
import { css } from "@emotion/react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  activeSection: string;
  id: string;
  setActiveSection: (section: string) => void;
}

export default function Review({ activeSection, id, setActiveSection }: Props) {
  // const { cursor, query_summary, reviews } = data || {};
  const {
    data: result,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteReviewQuery({ id });

  return (
    <div css={S}>
      <InfiniteScroll
        dataLength={(result?.pages.length || 0) * 30}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        scrollableTarget="review-scroll"
      >
        {result?.pages.map((page, i) => (
          <div key={i} className="mt-2">
            {page.review.reviews.map((item: ReviewContentType, i: number) => {
              const { review, votes_up, voted_up, votes_funny, create_date } =
                item;
              return (
                <ReviewCard
                  key={i}
                  className={item.voted_up ? "postive" : "negative"}
                  {...{ review, votes_up, voted_up, votes_funny, create_date }}
                />
              );
            })}
          </div>
        ))}
      </InfiniteScroll>
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
