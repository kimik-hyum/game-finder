import AppCard from "@/components/AppCard";
import { getList, useGetGameList } from "@/query/list";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import style from "@/styles/list.module.scss";
import { css } from "@emotion/react";

export default function Recent() {
  const { data, isLoading } = useGetGameList();
  return (
    <div>
      <h1>Recent</h1>
      <div css={S}>
        {data?.list.map((item: any, i: number) => {
          const { app_id, name } = item;
          return <AppCard key={app_id} index={i} {...{ app_id, name }} />;
        })}
      </div>
    </div>
  );
}

const S = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 8px;
`;
