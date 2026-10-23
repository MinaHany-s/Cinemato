import axios from "axios";
import { useEffect, useState } from "react";
import type { Movie } from "../Contexts/MoviesContext";

type SearchBarProps = {
  type: "movie" | "tv";
  setSearchResults: (movies: Movie[]) => void;
  setIsSearching: (value: boolean) => void;
};


const token = import.meta.env.VITE_TMDB_TOKEN;

export default function SearchBar({
  type,
  setSearchResults,
  setIsSearching,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  async function handleSearch() {
    const searchQuery = query.trim();

    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type}`,
        {
          params: { query: searchQuery },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSearchResults(data.results);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [query, type]);

  return (
    <form
      className="mx-auto w-xl pt-4 max-md:w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative flex items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setIsSearching(value.trim().length > 0);
          }}
          placeholder="Search movies"
          className="w-full rounded-xl border border-neutral-700/70 bg-[#161616] py-3.5 pl-4 pr-24 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-neutral-500"
        />

        <button
          type="submit"
          className="absolute right-1.5 rounded-lg bg-[#2E2E2E] px-4 py-2 text-sm text-white hover:bg-[#414141]"
        >
          Search
        </button>
      </div>
    </form>
  );
}