import { useContext, useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import { MoviesContext, type Movie } from "../Contexts/MoviesContext";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

export default function Movies() {
  const context = useContext(MoviesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTopRated, setIsTopRated] = useState(true);
  const [isTrending, setIsTrending] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isNowPlaying, setIsNowPlaying] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  if (!context) {
    throw new Error("Movies must be used within MoviesContextProvider");
  }

  const {
    ratedMovies,
    fetchRatedMovies,
    totalPages,
    fetchPopularMovies,
    popularMovies,
    fetchTrendingMovies,
    trendingMovies,
    fetchNowPlayingMovies,
    nowPlayingMovies,
  } = context;

  useEffect(() => {
    fetchRatedMovies(currentPage);
    fetchPopularMovies(currentPage);
    fetchTrendingMovies(currentPage);
    fetchNowPlayingMovies(currentPage);
  }, [currentPage]);
  


  return (
    <div className="m-9" id="movies">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-3 justify-center max-md:flex-col">
          <h2 className="text-2xl font-bold text-white">Movies</h2>
        </div>

        <div className="flex rounded-xl border border-white/10 bg-[#1A1A1A] p-1">
          <button
            onClick={() => {
              setIsTopRated(true);
              setIsTrending(false);
              setIsPopular(false);
              setIsNowPlaying(false);
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
              setIsNowPlaying(false);
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
              setIsNowPlaying(false);
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
          <button
            onClick={() => {
              setIsPopular(false);
              setIsTrending(false);
              setIsTopRated(false);
              setIsNowPlaying(true);
              setCurrentPage(1);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
              isNowPlaying
                ? "bg-[#2E2E2E] text-white hover:bg-[#3A3A3A]"
                : "text-gray-400 hover:bg-[#2E2E2E] hover:text-white"
            }`}
          >
            Now playing
          </button>
        </div>
      </div>
      <SearchBar
        type="movie"
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />

      {isSearching ? (
        <MoviesList list={searchResults} type={'movie'} />
      ) : (
        <>
          {isTopRated && <MoviesList list={ratedMovies} type={'movie'} />}
          {isPopular && <MoviesList list={popularMovies} type={'movie'} />}
          {isTrending && <MoviesList list={trendingMovies} type={'movie'} />}
          {isNowPlaying && <MoviesList list={nowPlayingMovies} type={'movie'} />}
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);

          document.getElementById("movies")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      />
    </div>
  );
}
