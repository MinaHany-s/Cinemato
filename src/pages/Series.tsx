import { useContext, useEffect, useState } from "react";
import { SeriesContext, type Serie } from "../Contexts/SeriesContext";
import SearchBar from "../components/SearchBar";
import MoviesList from "../components/MoviesList";
import Pagination from "../components/Pagination";

export default function Series() {
  const context = useContext(SeriesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTopRated, setIsTopRated] = useState(true);
  const [isTrending, setIsTrending] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [searchResults, setSearchResults] = useState<Serie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  if (!context) {
    throw new Error("Movies must be used within MoviesContextProvider");
  }

  const {
    ratedSeries,
    fetchRatedSeries,
    totalPages,
    fetchPopularSeries,
    popularSeries,
    trendingSeries,
    fetchTrendingSeries,
  } = context;

  useEffect(() => {
    fetchRatedSeries(currentPage);
    fetchPopularSeries(currentPage);
    fetchTrendingSeries(currentPage);
  }, [currentPage]);

  return (
    <div className="md:m-9 m-2 pt-4" id="series">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-3 justify-center max-md:flex-col">
          <h2 className="text-2xl font-bold text-white">TV</h2>
        </div>

        <div className="flex rounded-xl border border-white/10 bg-[#1A1A1A] p-1">
          <button
            onClick={() => {
              setIsTopRated(true);
              setIsTrending(false);
              setIsPopular(false);
              setCurrentPage(1);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
              isTopRated
                ? "bg-[#2E2E2E] text-white hover:bg-[#3A3A3A]"
                : "text-gray-400 hover:bg-[#2E2E2E] hover:text-white"
            }`}
          >
            Top rated
          </button>
          <button
            onClick={() => {
              setIsTrending(true);
              setIsTopRated(false);
              setIsPopular(false);
              setCurrentPage(1);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
              isTrending
                ? "bg-[#2E2E2E] text-white hover:bg-[#3A3A3A]"
                : "text-gray-400 hover:bg-[#2E2E2E] hover:text-white"
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => {
              setIsPopular(true);
              setIsTrending(false);
              setIsTopRated(false);
              setCurrentPage(1);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
              isPopular
                ? "bg-[#2E2E2E] text-white hover:bg-[#3A3A3A]"
                : "text-gray-400 hover:bg-[#2E2E2E] hover:text-white"
            }`}
          >
            Popular
          </button>
         
        </div>
      </div>
      <SearchBar
        type="tv"
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />

      {isSearching ? (
        <MoviesList list={searchResults} />
      ) : (
        <>
          {isTopRated && <MoviesList list={ratedSeries} type={'tv'} />}
          {isPopular && <MoviesList list={popularSeries} type={'tv'} />}
          {isTrending && <MoviesList list={trendingSeries} type={'tv'} />}
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);

          document.getElementById("series")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      />
    </div>
  );
}
