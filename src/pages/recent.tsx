import { getList, useGetGameList } from "@/query/list";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Recent() {
  const { data, isLoading } = useGetGameList();
  console.log(data);
  return (
    <div>
      <h1>Recent</h1>
    </div>
  );
}
