import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useGetGameList = () => {
  return useQuery<any, AxiosError>(["product/detail"], async () => {
    const res = await axios.request({
      url: `/api/list`,
      method: "GET",
    });
    return res.data;
  });
};
