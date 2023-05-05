import AppCard from "@/components/AppCard";
import { getList, useGetGameList } from "@/query/app";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import style from "@/styles/list.module.scss";
import { css } from "@emotion/react";
import { ReactElement, useRef, useState } from "react";
import Wrap from "@/layout/Wrap";

export default function Recent() {
  const { data, isLoading } = useGetGameList("recent");
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
          { threshold: 0.1 }
        )
      : null
  );

  const onVisible = (node: HTMLAnchorElement | null, id: string) => {
    if (node !== null && observer.current) {
      observer.current.observe(node);
      node.id = id;
    }
  };
  console.log(data);
  return (
    <div>
      <div css={S}>
        {data?.list?.map((item: any, i: number) => {
          const { app_id, name, release_date, tag, supported_languages } = item;
          return (
            <AppCard
              key={app_id}
              index={i}
              {...{ app_id, name, release_date, tag, supported_languages }}
              isVisible={visibleCards.has(app_id.toString())}
              onVisible={onVisible}
            />
          );
        })}
      </div>
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
