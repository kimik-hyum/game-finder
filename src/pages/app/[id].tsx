import { isClient } from "@/constants/common";
import AppDetail from "@/containers/AppDetail";
import Review from "@/containers/Review";
import Wrap from "@/layout/Wrap";
import { getDetail, getReview, useAppDetail, useAppReview } from "@/query/app";
import { css } from "@emotion/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { ReactElement } from "react";

export default function Detail() {
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState("content");
  const { id } = router.query;
  const { data: detail } = useAppDetail({ id: id as string, enable: !!id });
  const { data: review } = useAppReview({ id: id as string, enable: !!id });

  const handleHover = () => {
    isClient && document.body.classList.add("no-scroll");
    setActiveSection("review");
  };
  const handleLeave = () => {
    isClient && document.body.classList.remove("no-scroll");
    setActiveSection("content");
  };
  console.log(activeSection);
  return (
    <Wrap pageName={detail && detail.data[id as string]?.data.name}>
      <div css={S} className={`active-${activeSection}`}>
        <div className="content">
          <AppDetail detail={detail?.data[id as string].data} />
        </div>
        <div
          className="review"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Review {...review} {...{ setActiveSection, activeSection }} />
        </div>
      </div>
    </Wrap>
  );
}

const S = css`
  position: relative;
  &.active-content {
    .review {
      z-index: 1;
      filter: blur(10px);
      opacity: 0.5;
    }
    .content {
      z-index: 10;
    }
  }
  &.active-review {
    .review {
      z-index: 10;
    }
    .content {
      z-index: 1;
      filter: blur(10px);
      opacity: 0.5;
    }
  }
  .content,
  .review {
    transition: filter, opacity 0.5s;
  }
  .content {
    position: relative;
    max-width: 1224px;
    margin: 0 auto;
    padding: 0 100px;
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
