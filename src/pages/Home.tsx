import { useContext, useEffect, useState } from "react";
import Carousal from "../components/Carousal";
import { MediaContext } from "../Contexts/MediaContext";
import Pagination from "../components/Pagination";

import MoviesList from "../components/MoviesList";

export default function Home() {
  const [isDay, setIsDay] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("Home must be inside MediaContextProvider");
  }
  const {
    totalPages,
    weekTrending,
    carsoalTrending,
    dayTrending,
    carousalLoading,
    fetchTrending,
  } = context;

  useEffect(() => {
    fetchTrending("week", currentPage);
    fetchTrending("day", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col">
        <Carousal
          trending={carsoalTrending.slice(10)}
          carousalLoading={carousalLoading}
        />
        <div className="mx-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Trending</h2>

          <div
            id="trending"
            className="flex rounded-xl border border-white/10 bg-[#1A1A1A] p-1"
          >
            <button
              onClick={() => setIsDay(true)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                isDay
                  ? "bg-[#2E2E2E] text-white hover:bg-[#3A3A3A]"
                  : "text-gray-400 hover:bg-[#2E2E2E] hover:text-white"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setIsDay(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                !isDay
                  ? "bg-[#2E2E2E] text-white hover:bg-[#3A3A3A]"
                  : "text-gray-400 hover:bg-[#2E2E2E] hover:text-white"
              }`}
            >
              Week
            </button>
          </div>
        </div>
        {isDay ? (
          <MoviesList list={dayTrending}  />
        ) : (
          <MoviesList list={weekTrending} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);

            document.getElementById("trending")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
      </div>
    </>
  );
}
