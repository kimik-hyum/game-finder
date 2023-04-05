import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const getList = async () => {
  const { data } = await axios.get("http://localhost:3000/api/list");
  console.log("data", data);
  return data;
};

export const useGetGameList = () => {
  return useQuery<any, AxiosError>(["app/list"], async () => {
    getList();
  });
};
