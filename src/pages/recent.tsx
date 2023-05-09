import AppCard from "@/components/AppCard";
import { getList, useGetGameList } from "@/query/app";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import style from "@/styles/list.module.scss";
import { css } from "@emotion/react";
import { ReactElement, useRef, useState } from "react";
import Wrap from "@/layout/Wrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { pageSize } from "@/constants/common";

export default function Recent() {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetGameList("recent");
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const observer = useRef<IntersectionObserver | null>(
    typeof window !== "undefined"
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => new Set([...prev, entry.target.id]));
              } else {
                setVisibleCards((prev) => {
                  const newSet = new Set([...prev]);
                  newSet.delete(entry.target.id);
                  return newSet;
                });
              }
            });
          },
          { threshold: 0.3 }
        )
      : null
  );

  const onVisible = (node: HTMLAnchorElement | null, id: string) => {
    if (node !== null && observer.current) {
      observer.current.observe(node);
      node.id = id;
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={data?.pages.length || 0 * pageSize}
        next={fetchNextPage}
        css={S}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {data?.pages?.map((page) => {
          return page.result.list.map((item: any, i: number) => {
            const { app_id, name, release_date, tag, supported_languages } =
              item;
            return (
              <AppCard
                key={app_id}
                index={i}
                {...{ app_id, name, release_date, tag, supported_languages }}
                isVisible={visibleCards.has(app_id.toString())}
                onVisible={onVisible}
              />
            );
          });
        })}
      </InfiniteScroll>
    </div>
  );
}

Recent.getLayout = function getLayout(page: ReactElement) {
  return <Wrap>{page}</Wrap>;
};

const S = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 16px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
