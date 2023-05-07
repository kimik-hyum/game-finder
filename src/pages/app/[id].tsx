import { isClient } from "@/constants/common";
import AppDetail from "@/containers/AppDetail";
import Review from "@/containers/Review";
import Wrap from "@/layout/Wrap";
import { getDetail, getReview, useAppDetail, useAppReview } from "@/query/app";
import { css } from "@emotion/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: detail } = useAppDetail({ id: id as string, enable: !!id });
  const { data: review } = useAppReview({ id: id as string, enable: !!id });

  const handleHover = () => {
    isClient && document.body.classList.add("no-scroll");
  };
  const handleLeave = () => {
    isClient && document.body.classList.remove("no-scroll");
  };

  return (
    <Wrap pageName={detail && detail.data[id as string]?.data.name}>
      <div css={S}>
        <div className="content">
          <AppDetail detail={detail?.data[id as string].data} />
        </div>
        <div
          className="review"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Review {...review} />
        </div>
      </div>
    </Wrap>
  );
}

const S = css`
  position: relative;
  &:has(.review:hover) > .content {
    filter: blur(10px);
    opacity: 0.5;
  }
  .content,
  .review {
    transition: filter, opacity 0.5s;
  }
  .content {
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    z-index: 100;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 13%,
      rgba(255, 255, 255, 1) 32%,
      rgba(255, 255, 255, 1) 87%,
      rgba(255, 255, 255, 0) 99%,
      rgba(255, 255, 255, 0) 100%
    );
    &:hover {
      & + .review {
        filter: blur(10px);
        opacity: 0.5;
      }
    }
  }
  .review {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
    padding: 0 16px;
    z-index: 1;
    &:hover {
      overflow: auto;
    }
  }
`;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["app/detail", id], () => getDetail(id));
  await queryClient.prefetchQuery(["app/review", id], () => getReview(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
