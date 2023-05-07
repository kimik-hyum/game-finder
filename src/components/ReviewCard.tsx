import { FCT } from "@/type/common";
import { css } from "@emotion/react";

const ReviewCard: FCT = ({ children }) => {
  return <div css={S}>{children}</div>;
};

const S = css`
  position: relative;
  padding: 16px;
  border-radius: 10px;
  margin-top: 8px;
  min-height: 120px;
  background: #307252;
  max-width: calc((100vw - 1024px) / 2);
`;

export default ReviewCard;
