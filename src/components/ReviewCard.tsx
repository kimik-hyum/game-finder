import { ForwardRefRenderFunction, forwardRef, HTMLAttributes } from "react";
import { css } from "@emotion/react";
import clsx from "clsx";
import React from "react";

type DivProps = React.HTMLProps<HTMLDivElement>;

interface Props extends DivProps {}

const ReviewCard = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<DivProps>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      css={S}
      className={`review-card ${clsx(className)}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

ReviewCard.displayName = "ReviewCard";

const S = css`
  position: relative;
  padding: 16px;
  border-radius: 10px;
  margin-top: 8px;
  min-height: 120px;
  background: #307252;
  max-width: calc((100vw - 1024px) / 2);
  color: #fff;
`;

export default ReviewCard;
