import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import qs from "qs";
import { format } from "date-fns";

export const getList = async (query: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/list?${query}`);
  return data;
};

export const useGetGameList = (type?: "recent" | "popular") => {
  const query = () => {
    switch (type) {
      case "recent":
        return qs.stringify({
          release: true,
          _sort: "release_date:DESC,createdAt:DESC",
          name_ncontains: "playtest",
          _where: [
            {
              release_date_lte: format(new Date(), "yyyy-MM-dd"),
            },
          ],
        });
    }
  };
  return useInfiniteQuery<any, AxiosError>(
    ["app/list"],
    async () => {
      return getList(query() || "");
    },
    {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
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
    ["app/detail", id],
    async () => {
      return getDetail(id);
    },
    {
      enabled: enable,
    }
  );
};

export const getReview = async (id: string) => {
  const { data } = await axios.get(`/api/review?appids=${id}`);
  return data;
};

export const useAppReview = ({
  id,
  enable,
}: {
  id: string;
  enable: boolean;
}) => {
  return useQuery<any, AxiosError>(
    ["app/review", id],
    async () => {
      return getReview(id);
    },
    {
      enabled: enable,
    }
  );
};
