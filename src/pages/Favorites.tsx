
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import MovieImage from "../components/MovieImage";

type FavoriteItem = {
  id: number;
  type: "movie" | "tv";
  title: string;
  poster_path: string | null;
  vote_average: number;
};

const FAVORITES_KEY = "favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]"
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorites(savedFavorites);
    } catch {
      setFavorites([]);
    }
  }, []);

  function removeFavorite(id: number, type: "movie" | "tv") {
    const updatedFavorites = favorites.filter(
      (item) => !(item.id === id && item.type === type)
    );

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  }

  return (
    <main className="min-h-screen px-4 py-10 text-white md:px-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            My Favorites
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Your favorite movies and TV shows
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#2E2E2E] px-4 py-3">
          <FaHeart className="text-red-500" />
          <span>{favorites.length}</span>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <FaHeart className="mb-4 text-5xl text-gray-600" />
          <h2 className="text-xl font-semibold">
            No favorites yet
          </h2>
          <p className="mt-2 text-gray-400">
            Add movies or TV shows to see them here.
          </p>
          <Link
            to="/"
            className="mt-6 rounded-xl bg-[#2E2E2E] px-5 py-3 transition hover:bg-[#3A3A3A]"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {favorites.map((item) => (
            <div key={`${item.type}-${item.id}`} className="group">
              <div className="relative overflow-hidden rounded-2xl">
                <Link to={`/${item.type}/${item.id}`}>
                  <MovieImage
                    posterPath={item.poster_path}
                    title={item.title}
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => removeFavorite(item.id, item.type)}
                  aria-label={`Remove ${item.title} from favorites`}
                  title="Remove from favorites"
                  className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-3 text-red-500 transition hover:scale-110 hover:bg-black"
                >
                  <FaHeart />
                </button>
              </div>

              <Link to={`/${item.type}/${item.id}`}>
                <h2 className="mt-3 truncate font-semibold transition group-hover:text-gray-300">
                  {item.title}
                </h2>
              </Link>

              <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
                <span className="rounded-md bg-[#2E2E2E] px-2 py-1">
                  {item.type === "movie" ? "Movie" : "TV Show"}
                </span>

                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {item.vote_average?.toFixed(1) ?? "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
