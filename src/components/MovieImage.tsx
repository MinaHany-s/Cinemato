import { useState } from "react";

type MovieImageProps = {
  posterPath: string | null;
  title: string;
};

export default function MovieImage({
  posterPath,
  title,
}: MovieImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-72 max-md:h-50 w-full overflow-hidden rounded-2xl bg-[#252525]">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#252525] via-[#3A3A3A] to-[#252525]" />
      )}

      {posterPath && !hasError && (
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`block h-full w-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {(!posterPath || hasError) && !isLoading && (
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          No image available
        </div>
      )}
    </div>
  );
}