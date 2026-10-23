import { createContext } from "react";
export type Movie = {
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

type movieContextType = {
  ratedMovies: Movie[];
  fetchRatedMovies: (page: number) => Promise<void>;
  fetchPopularMovies: (page: number) => Promise<void>;
  fetchTrendingMovies: (page: number) => Promise<void>;
  fetchNowPlayingMovies: (page: number) => Promise<void>;
  nowPlayingMovies:Movie[];
  popularMovies:Movie[];
  trendingMovies:Movie[];
  totalPages:number;
};

export const MoviesContext = createContext<movieContextType | null>(null);
