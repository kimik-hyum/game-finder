import Wrap from "@/layout/Wrap";
import { getDetail, useAppDetail } from "@/query/app";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useAppDetail({ id: id as string, enable: !!id });
  return (
    <Wrap pageName={"상세"}>
      <div>{data && data.data[id as string]?.data.name}</div>
    </Wrap>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["app/detail", id], () => getDetail(id));

  console.log(queryClient.getQueryData(["app/detail", id]));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
