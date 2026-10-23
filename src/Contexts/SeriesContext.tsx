import { createContext } from "react";
export type Serie = {
  adult: boolean;
  name?: string;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type?: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type serieContextType = {
  ratedSeries: Serie[];
  fetchRatedSeries: (page: number) => Promise<void>;
  fetchPopularSeries: (page: number) => Promise<void>;
  fetchTrendingSeries: (page: number) => Promise<void>;
  popularSeries: Serie[];
  trendingSeries: Serie[];
  totalPages: number;
};

export const SeriesContext = createContext<serieContextType | null>(null);
