import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaPlay,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaHome,
  FaFilm,
  FaTv,
  FaBuilding,
  FaArrowLeft,
} from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

type MediaDetailsData = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres?: Genre[];
  tagline?: string;
  status?: string;
  homepage?: string;
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  budget?: number;
  revenue?: number;
  original_language?: string;
  origin_country?: string[];
  production_companies?: ProductionCompany[];
};

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

const token = import.meta.env.VITE_TMDB_TOKEN;
const imageBase = "https://image.tmdb.org/t/p/";

type FavoriteItem = {
  id: number;
  type: "movie" | "tv";
  title: string;
  poster_path: string | null;
  vote_average: number;
};

const FAVORITES_KEY = "favorites";

export default function MediaDetails() {
  const { type, id } = useParams();

  const [details, setDetails] = useState<MediaDetailsData | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isMovie = type === "movie";

  const [isFavorite, setIsFavorite] = useState(false);
  function getFavorites(): FavoriteItem[] {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      return [];
    }
  }

  useEffect(() => {
    if (!details || !type || !["movie", "tv"].includes(type)) return;

    const favorites = getFavorites();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavorite(
      favorites.some((item) => item.id === details.id && item.type === type),
    );
  }, [details, type]);

  useEffect(() => {
    if (!id || !["movie", "tv"].includes(type ?? "")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      setError(true);
      return;
    }

    let cancelled = false;

    async function getDetails() {
      setLoading(true);
      setError(false);
      setDetails(null);
      setTrailer(null);

      try {
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [detailsResponse, videosResponse] = await Promise.all([
          axios.get<MediaDetailsData>(
            `https://api.themoviedb.org/3/${type}/${id}`,
            { headers, params: { language: "en-US" } },
          ),
          axios.get<{ results: Video[] }>(
            `https://api.themoviedb.org/3/${type}/${id}/videos`,
            { headers, params: { language: "en-US" } },
          ),
        ]);

        if (cancelled) return;

        setDetails(detailsResponse.data);

        const videos = videosResponse.data.results;

        const selectedTrailer =
          videos.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official,
          ) ??
          videos.find(
            (video) => video.site === "YouTube" && video.type === "Trailer",
          ) ??
          null;

        setTrailer(selectedTrailer);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load media details:", err);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getDetails();

    return () => {
      cancelled = true;
    };
  }, [id, type]);

  function toggleFavorite() {
    if (!details || (type !== "movie" && type !== "tv")) return;

    const favorites = getFavorites();

    const exists = favorites.some(
      (item) => item.id === details.id && item.type === type,
    );

    let updatedFavorites: FavoriteItem[];

    if (exists) {
      updatedFavorites = favorites.filter(
        (item) => !(item.id === details.id && item.type === type),
      );
    } else {
      updatedFavorites = [
        ...favorites,
        {
          id: details.id,
          type,
          title: details.title ?? details.name ?? "Untitled",
          poster_path: details.poster_path,
          vote_average: details.vote_average,
        },
      ];
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setIsFavorite(!exists);
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-white" />
        <p className="animate-pulse text-sm text-neutral-400">
          Loading {isMovie ? "movie" : "series"} details...
        </p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center text-white">
        <MdOutlineErrorOutline className="mb-4 text-6xl text-neutral-500" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-3 max-w-md text-sm text-neutral-400">
          We couldn't load this title. It may not exist, or the request may have
          failed.
        </p>
        <Link
          to="/"
          className="mt-7 rounded-xl bg-[#2E2E2E] px-5 py-3 transition hover:bg-[#414141]"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const title = details.title ?? details.name ?? "Untitled";
  const releaseDate = details.release_date ?? details.first_air_date;
  const year = releaseDate ? releaseDate.slice(0, 4) : "Unknown";
  const genres = details.genres ?? [];
  const companies = details.production_companies ?? [];

  const formatMoney = (amount?: number) => {
    if (!amount) return "Unknown";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen pb-16 text-neutral-200">
      {/* Hero */}
      <section className="relative min-h-140 overflow-hidden md:min-h-162.5">
        {details.backdrop_path && (
          <img
            src={`${imageBase}original${details.backdrop_path}`}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-r from-[#1e1e1e] via-[#1e1e1e]/85 to-[#1e1e1e]/30" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1e1e1e] via-transparent to-[#1e1e1e]/30" />

        <div className="relative mx-auto flex min-h-140 max-w-7xl items-center px-6 py-20 md:min-h-162.5 md:px-10">
          <div className="grid w-full items-center gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[290px_1fr]">
            {/* Poster */}
            <div className="mx-auto w-48 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 md:mx-0 md:w-full">
              {details.poster_path ? (
                <img
                  src={`${imageBase}w500${details.poster_path}`}
                  alt={`${title} poster`}
                  className="w-full object-cover"
                />
              ) : (
                <div className="flex aspect-2/3 items-center justify-center bg-neutral-800">
                  {isMovie ? (
                    <FaFilm className="text-5xl text-neutral-600" />
                  ) : (
                    <FaTv className="text-5xl text-neutral-600" />
                  )}
                </div>
              )}
            </div>

            {/* Main info */}
            <div className="max-w-3xl text-center md:text-left">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  {isMovie ? "Movie" : "TV Series"}
                </span>

                {details.status && (
                  <span className="rounded-full bg-[#2E2E2E]/90 px-3 py-1 text-xs text-neutral-300">
                    {details.status}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              {details.tagline && (
                <p className="mt-4 text-base italic text-neutral-300 md:text-lg">
                  "{details.tagline}"
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-neutral-300 md:justify-start">
                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <strong className="text-white">
                    {details.vote_average.toFixed(1)}
                  </strong>
                  <span className="text-neutral-500">
                    ({details.vote_count.toLocaleString()} votes)
                  </span>
                </span>

                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-neutral-400" />
                  {year}
                </span>

                {isMovie && details.runtime ? (
                  <span className="flex items-center gap-2">
                    <FaClock className="text-neutral-400" />
                    {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                  </span>
                ) : null}

                {!isMovie && details.number_of_seasons != null && (
                  <span>
                    {details.number_of_seasons}{" "}
                    {details.number_of_seasons === 1 ? "Season" : "Seasons"}
                  </span>
                )}
              </div>

              {genres.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-neutral-200 backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.03] hover:bg-neutral-200 active:scale-95"
                  >
                    <FaPlay size={13} />
                    Watch Trailer
                  </a>
                )}

                {details.homepage && (
                  <a
                    href={details.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/10 active:scale-95"
                  >
                    <FaHome />
                    Official Website
                  </a>
                )}
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition-all duration-200 active:scale-95 ${
                    isFavorite
                      ? "border-red-500/30 bg-red-500/15 text-red-400 hover:bg-red-500/25"
                      : "border-white/15 bg-black/30 text-white backdrop-blur-md hover:bg-white/10"
                  }`}
                >
                  <FaHeart className={isFavorite ? "text-red-500" : ""} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional details */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pt-8 md:grid-cols-[1fr_300px] md:px-10 lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-neutral-400" />
            <h2 className="text-2xl font-bold text-white">Overview</h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-400">
            {details.overview || "No overview is available for this title yet."}
          </p>

          {/* Production companies */}
          {companies.length > 0 && (
            <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-neutral-400" />
                <h2 className="text-2xl font-bold text-white">
                  Production Companies
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex min-h-24 items-center gap-3 rounded-xl border border-white/5 bg-[#181818] p-4 transition hover:border-white/10 hover:bg-[#222222]"
                  >
                    {company.logo_path ? (
                      <img
                        src={`${imageBase}w185${company.logo_path}`}
                        alt=""
                        className="max-h-10 w-14 object-contain"
                      />
                    ) : (
                      <FaBuilding className="shrink-0 text-xl text-neutral-600" />
                    )}

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-200">
                        {company.name}
                      </p>
                      {company.origin_country && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {company.origin_country}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Information sidebar */}
        <aside>
          <div className="rounded-2xl border border-white/5 bg-[#181818] p-6">
            <h2 className="mb-6 text-lg font-bold text-white">
              {isMovie ? "Movie Info" : "Series Info"}
            </h2>

            <div className="space-y-5">
              <Info label="Original Title">
                {details.original_title ?? details.original_name ?? title}
              </Info>

              <Info label={isMovie ? "Release Date" : "First Air Date"}>
                {releaseDate || "Unknown"}
              </Info>

              {!isMovie && details.last_air_date && (
                <Info label="Last Air Date">{details.last_air_date}</Info>
              )}

              <Info label="Language">
                {details.original_language?.toUpperCase() ?? "Unknown"}
              </Info>

              {details.origin_country && (
                <Info label="Country">
                  {details.origin_country.join(", ") || "Unknown"}
                </Info>
              )}

              {isMovie && (
                <>
                  <Info label="Budget">{formatMoney(details.budget)}</Info>
                  <Info label="Revenue">{formatMoney(details.revenue)}</Info>
                </>
              )}

              {!isMovie && (
                <>
                  <Info label="Episodes">
                    {details.number_of_episodes ?? "Unknown"}
                  </Info>
                  <Info label="Seasons">
                    {details.number_of_seasons ?? "Unknown"}
                  </Info>
                  {details.episode_run_time &&
                    details.episode_run_time.length > 0 && (
                      <Info label="Episode Runtime">
                        {details.episode_run_time.join(", ")} min
                      </Info>
                    )}
                </>
              )}

              <Info label="Rating">
                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  {details.vote_average.toFixed(1)} / 10
                </span>
              </Info>
            </div>
          </div>

          <Link
            to={isMovie ? "/movies" : "/series"}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#181818] px-4 py-3 text-sm text-neutral-400 transition hover:bg-[#252525] hover:text-white"
          >
            <FaArrowLeft size={12} />
            Back to {isMovie ? "Movies" : "Series"}
          </Link>
        </aside>
      </section>
    </main>
  );
}

function Info({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <p className="mb-1.5 text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <div className="break-words text-sm font-medium text-neutral-200">
        {children}
      </div>
    </div>
  );
}
