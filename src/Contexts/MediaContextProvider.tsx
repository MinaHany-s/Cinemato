import { useEffect, useState } from "react";
import { MediaContext, type Media, type Props } from "./MediaContext";
import axios from "axios";

const token = import.meta.env.VITE_TMDB_TOKEN;

export default function MediaContextProvider({ children }: Props) {
  const [weekTrending, setWeekTrending] = useState([]);
  const [carsoalTrending, setCarsoalTrending] = useState([]);
  const [dayTrending, setDayTrending] = useState([]);
  const [carousalLoading, setCarousalLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrending = async (timeWindow: "day" | "week", page: number) => {
    try {
      setCarousalLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/${timeWindow}?page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (timeWindow === "week") {
        setWeekTrending(
          res.data.results.filter(
            (item: Media) =>
              item.media_type === "movie" || item.media_type === "tv",
          ),
        );
      }
      if (timeWindow === "day") {
        setDayTrending(
          res.data.results.filter(
            (item: Media) =>
              item.media_type === "movie" || item.media_type === "tv",
          ),
        );
      }
      setTotalPages(res.data.total_pages);
      setCarousalLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCarousalTrending = async () => {
    try {
      setCarousalLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCarsoalTrending(res.data.results);
      setCarousalLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCarousalTrending();
  }, []);
  return (
    <MediaContext.Provider
      value={{
        carsoalTrending,
        dayTrending,
        weekTrending,
        carousalLoading,
        fetchTrending,
        totalPages,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}
