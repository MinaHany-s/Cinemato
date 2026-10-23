import { useState } from "react";
import type { Props } from "./MediaContext";
import { SeriesContext, type Serie } from "./SeriesContext";
import axios from "axios";
const token = import.meta.env.VITE_TMDB_TOKEN;

export default function SeriesContextProvider({ children }: Props) {
  const [ratedSeries, setRatedSeries] = useState<Serie[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<Serie[]>([]);
  const [popularSeries, setPopularSeries] = useState<Serie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  async function fetchRatedSeries(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/top_rated?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setRatedSeries(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }
  async function fetchTrendingSeries(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/trending/tv/week?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setTrendingSeries(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }
  async function fetchPopularSeries(page: number) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/popular?page=${page}`,
      headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    };
    await axios
      .request(options)
      .then((res) => {
        setPopularSeries(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      })
      .catch((err) => console.error(err));
  }


  return (
    <SeriesContext.Provider
      value={{
        ratedSeries,
        fetchRatedSeries,
        totalPages,
        fetchPopularSeries,
        popularSeries,
        trendingSeries,
        fetchTrendingSeries,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
}
