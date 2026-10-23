import { createContext, type ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export type Media = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name?: string;
  title?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
};

type MediaContextType = {
  weekTrending: Media[];
  dayTrending: Media[];
  carsoalTrending:Media[];
  carousalLoading: boolean;
  totalPages:number;
  fetchTrending: (timeWindow: "day" | "week", page:number) => Promise<void>;
};

export const MediaContext = createContext<MediaContextType | null>(null);
