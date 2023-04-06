import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const getList = async () => {
  const { data } = await axios.get("http://localhost:3000/api/list");
  return data;
};

export const useGetGameList = () => {
  return useQuery<any, AxiosError>(["app/list"], async () => {
    return getList();
  });
};

export const getDetail = async (id: string) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/detail?appids=${id}`
  );
  return data;
};

export const useAppDetail = ({
  id,
  enable,
}: {
  id: string;
  enable: boolean;
}) => {
  return useQuery<any, AxiosError>(
    ["app/detail"],
    async () => {
      return getDetail(id);
    },
    {
      enabled: enable,
    }
  );
};
