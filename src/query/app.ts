import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import qs from "qs";
import { format } from "date-fns";
import { pageSize } from "@/constants/common";

export const getList = async (query: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/list?${query}`);
  return data;
};

export const useGetGameList = (type?: "recent" | "popular") => {
  return useInfiniteQuery<any, AxiosError>(
    ["app/list"],
    async ({ pageParam = 1 }) => {
      const start = (pageParam - 1) * pageSize;
      const limit = pageSize;
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
              _start: start,
              _limit: limit,
            });
        }
      };
      return {
        result: await getList(query() || ""),
        next: pageParam + 1,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.result.totalPages < lastPage.next) {
          return undefined;
        }
        return lastPage.next;
      },
      keepPreviousData: true,
    }
  );
};

export const getDetail = async (id: string) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/detail?appids=${id}`
  );
  return data;
};

export interface DetailType {
  data: DetailTypeData;
}

export interface DetailTypeData {
  [x: string]: DetailContent;
}

export interface DetailContent {
  success: boolean;
  data: DetailData;
}

export interface DetailData {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  website: string;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  legal_notice: string;
  drm_notice: string;
  ext_user_account_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: PriceOverview;
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: Recommendations;
  achievements: Achievements;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: ContentDescriptors;
}

export interface Achievements {
  total: number;
  highlighted: Highlighted[];
}

export interface Highlighted {
  name: string;
  path: string;
}

export interface Category {
  id: number;
  description: string;
}

export interface ContentDescriptors {
  ids: any[];
  notes: null;
}

export interface Genre {
  id: string;
  description: string;
}

export interface Requirements {
  minimum: string;
  recommended: string;
}

export interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  webm: Mp4;
  mp4: Mp4;
  highlight: boolean;
}

export interface Mp4 {
  "480": string;
  max: string;
}

export interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Sub[];
}

export interface Sub {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

export interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

export interface Recommendations {
  total: number;
}

export interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

export interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface SupportInfo {
  url: string;
  email: string;
}

export const useAppDetail = ({
  id,
  enable,
}: {
  id: string;
  enable: boolean;
}) => {
  return useQuery<DetailType, AxiosError>(
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
  const { data } = await axios.get(
    `http://localhost:3000/api/review?appids=${id}`
  );
  return data;
};

export const getKoReview = async (id: string) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/review-ko?appids=${id}`
  );
  return data;
};

export interface ReviewType {
  data: ReviewData;
}

export interface ReviewData {
  success: number;
  query_summary: QuerySummary;
  reviews: ReviewContentType[];
  cursor: string;
}

export interface QuerySummary {
  num_reviews: number;
  review_score: number;
  review_score_desc: string;
  total_positive: number;
  total_negative: number;
  total_reviews: number;
}

export interface ReviewContentType {
  recommendationid: string;
  author: Author;
  language: string;
  review: string;
  timestamp_created: number;
  timestamp_updated: number;
  voted_up: boolean;
  votes_up: number;
  votes_funny: number;
  weighted_vote_score: string;
  comment_count: number;
  steam_purchase: boolean;
  received_for_free: boolean;
  written_during_early_access: boolean;
  hidden_in_steam_china: boolean;
  steam_china_location: string;
  create_date: string;
}

export interface Author {
  steamid: string;
  num_games_owned: number;
  num_reviews: number;
  playtime_forever: number;
  playtime_last_two_weeks: number;
  playtime_at_review: number;
  last_played: number;
}

export const useAppReview = ({
  id,
  enable,
}: {
  id: string;
  enable: boolean;
}) => {
  return useQuery<ReviewType, AxiosError>(
    ["app/review", id],
    async () => {
      return getReview(id);
    },
    {
      enabled: enable,
    }
  );
};

export const useAppKoReview = ({
  id,
  enable,
}: {
  id: string;
  enable: boolean;
}) => {
  return useQuery<ReviewType, AxiosError>(
    ["app/review-ko", id],
    async () => {
      return getKoReview(id);
    },
    {
      enabled: enable,
    }
  );
};

export const useInfiniteReviewQuery = ({ id }: { id?: string }) => {
  return useInfiniteQuery(
    ["landing/problem", id],
    async ({ pageParam }) => {
      const res = await axios.request<any>({
        url: "/api/reviews",
        params: {
          cursor: pageParam,
          id,
          filter: "recent",
        },
      });
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => {
        return !!lastPage.review.reviews.length
          ? lastPage.review.cursor
          : false;
      },
    }
  );
};
