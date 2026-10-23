import {  useState } from "react";
import type { Props } from "./MediaContext";
import { MoviesContext, type Movie } from "./MoviesContext";
import axios from "axios";
const token = import.meta.env.VITE_TMDB_TOKEN;

export default function MoviesContextProvider({ children }: Props) {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  async function fetchRatedMovies(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setRatedMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }
  async function fetchTrendingMovies(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/trending/movie/week?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setTrendingMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }
  async function fetchPopularMovies(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setPopularMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }
  async function fetchNowPlayingMovies(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setNowPlayingMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }
  

  return (
    <MoviesContext.Provider
      value={{
        ratedMovies,
        fetchRatedMovies,
        totalPages,
        fetchPopularMovies,
        popularMovies,
        trendingMovies,
        fetchTrendingMovies,
        nowPlayingMovies,
        fetchNowPlayingMovies
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
