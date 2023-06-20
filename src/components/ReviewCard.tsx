import { css } from "@emotion/react";
import { Chip, Stack } from "@mui/material";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

const isTextClamped = (elm: any) => {
  return elm.current.scrollHeight > elm.current.clientHeight;
};

const ReviewCard: FC<any> = ({
  review,
  voted_up,
  votes_up,
  votes_funny,
  create_date,
  className,
}) => {
  const [detail, setDetail] = useState(false);
  const [clamped, setClamped] = useState(false);
  const reviewEl = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    reviewEl.current && setClamped(isTextClamped(reviewEl));
  }, []);
  return (
    <div
      css={[basicReview, voted_up ? voteup : votedown]}
      className={`${clsx(className)}`}
    >
      <span
        ref={reviewEl}
        className={`review-content ${clamped ? "hover" : ""} ${
          detail ? "detail" : ""
        }`}
        onClick={() => setDetail(!detail)}
      >
        {review}
        <br />
      </span>
      <div className="date">{create_date}</div>
      <Stack direction="row" spacing={1} className="mt-4">
        {!!votes_up && <Chip label={<>👍🏻 &nbsp;{votes_up}</>} />}

        {!!votes_funny && <Chip label={<>😆 &nbsp;{votes_funny}</>} />}
      </Stack>
      {clamped && (
        <div className="detail-btn" onClick={() => setDetail(!detail)}>
          <button type="button">{detail ? "닫기" : "자세히 보기"}</button>
        </div>
      )}
    </div>
  );
};

const basicReview = css`
  position: relative;
  padding: 16px;
  border-radius: 10px;
  margin-top: 8px;
  min-height: 120px;
  max-width: calc((100vw - 1024px) / 2);
  width: 30vw;
  min-width: 150px;
  max-width: 600px;
  &.negative {
    background: rgb(148, 78, 73);
    margin-left: auto;
  }
  &.postive {
    background: #307252;
  }
  .review-content {
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &.hover {
      cursor: pointer;
    }
    &.detail {
      display: block;
      -webkit-box-orient: vertical;
      overflow: visible;
    }
  }
  .date {
    font-size: 12px;
    margin-bottom: 8px;
  }
  .detail-btn {
    text-align: right;
    font-size: 12px;
  }
  &:first-of-type {
    margin-top: 0;
  }
  .review {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    z-index: 10;
  }
  &:after {
    content: "";
    position: absolute;
    right: 24px;
    top: 24px;
    font-size: 48px;
    opacity: 0.3;
  }
`;

const voteup = css`
  background: #307252;
  &:after {
    content: "👍";
  }
`;
const votedown = css`
  background: #944e49;
  &:after {
    content: "😡";
  }
`;
export default ReviewCard;
