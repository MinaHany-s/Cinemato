import { IoIosInformationCircleOutline } from "react-icons/io";
import MovieImage from "./MovieImage";
import type { Media } from "../Contexts/MediaContext";
import { Link } from "react-router-dom";
import type { Serie } from "../Contexts/SeriesContext";

type MoviesListProps = {
  list: Media[] | Serie[];
  type?: "tv" | "movie" | null;
};
export default function MoviesList({ list, type }: MoviesListProps) {
  return (
    <div className=" md:m-10 m-2  grid grid-cols-3 md:grid-cols-6 md:gap-3 gap-1 ">
      {list.map((d) => {
        const mediaType = type ?? d.media_type ?? "movie";
        return (
          <div key={d.id}>
            <div className="rounded-2xl scale-95 hover:scale-100 group">
              <MovieImage
                posterPath={d.poster_path}
                title={d.name || d.title || "Movie"}
              />
              {/* Contet Up the pic */}
              <div className="absolute inset-0 z-0 rounded-xl bg-linear-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-end gap-2 p-3">
                <div className="flex text-white gap-2 flex-col items-start  w-full">
                  <div className="flex gap-1 items-center bg-white text-black text-sm rounded-3xl px-3">
                    <p className="text-sm">{d?.vote_average.toFixed(1)}</p>
                  </div>
                </div>

                <h2 className="text-sm font-bold text-white w-full pb-2">
                  {d.name || d.title}
                </h2>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex items-center gap-2 opacity-100 md:opacity-0
      transition-opacity duration-300 group-hover:opacity-100"
                >
                  <button
                    className="flex items-center gap-1 rounded-full bg-black/60
        px-3 py-2 md:px-5 text-xs md:text-sm text-white backdrop-blur-md
        transition-colors hover:bg-black/80 cursor-pointer"
                  >
                    Watch
                  </button>

                  <Link
                    to={`/${mediaType}/${d.id}`}
                    className="flex items-center justify-center rounded-full
        bg-black/60 p-2 md:p-3 text-white backdrop-blur-md
        transition-colors hover:bg-black/80 cursor-pointer"
                    aria-label="More information"
                  >
                    <IoIosInformationCircleOutline size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
