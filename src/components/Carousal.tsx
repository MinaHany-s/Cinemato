import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CircleLoader } from "react-spinners";
import { genres } from "../assets/genre";
import { FaArrowRight, FaPlay, FaStar } from "react-icons/fa";
import type { Media } from "../Contexts/MediaContext";

type CarousalProps = {
  trending: Media[];
  carousalLoading: boolean;
};

export default function Carousal({ trending, carousalLoading }: CarousalProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (carousalLoading) {
    return (
      <>
        <div className=" m-10 w-full h-full flex items-center justify-center ">
          <CircleLoader className="text-3xl" color="#36d7b7" />;
        </div>
      </>
    );
  }
  return (
    <div className="md:m-10 m-2 group">
      <CarouselProvider
        infinite={true}
        naturalSlideWidth={2.8}
        naturalSlideHeight={isMobile ? 2 : 1.2}
        totalSlides={trending.length}
        className=" relative rounded-2xl "
      >
        <Slider className="rounded-2xl  ">
          {trending.map((trend, idx) => {
            return (
              <Slide key={trend.id} index={idx}>
                <div className="relative h-full w-full">
                  {/* Pic */}
                  <img
                    src={`https://image.tmdb.org/t/p/original${trend.backdrop_path}`}
                    alt={trend.name || trend.title || "Movie"}
                    className="block h-full w-full object-cover"
                  />
                  {/* Contet Up the pic */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-end gap-4 p-9 max-md:p-3 ">
                    <span className="text-xs font-bold bg-white px-3 py-1 text-black rounded-full">
                      Trending now
                    </span>

                    <h2 className="md:text-3xl text-xl font-bold text-white">
                      {trend.name || trend.title}
                    </h2>

                    <div className="flex gap-5">
                      {trend.genre_ids.map((id) => {
                        const genre = genres.genres.find(
                          (genre) =>
                            genre.id === id && genre.type === trend.media_type,
                        );
                        return (
                          <span
                            key={id}
                            className=" max-md:text-sm bg-black font-semibold text-white rounded-full px-3"
                          >
                            {genre?.name}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex text-white gap-2 items-center">
                      <p className="text-lg">
                        {trend.release_date?.split("-")[0]}
                      </p>
                      <div className="flex gap-1 items-center">
                        <FaStar />
                        <p className="text-lg">
                          {trend?.vote_average.toFixed(1)} Imdb
                        </p>
                      </div>

                      <h2 className="text-xl capitalize  text-gray-400">
                        {trend.media_type}
                      </h2>
                    </div>

                    <div className="flex md:gap-3 gap-1">
                      <button className="max-md:text-xs max-md:px-4 max-md:py-1 cursor-pointer scale-95 hover:scale-100 transition-all duration-300 w-fit rounded-xl bg-white px-7 py-2 font-semibold text-sm text-black flex gap-2 items-center">
                        <FaPlay />
                        Watch
                      </button>
                      <button className="max-md:text-xs max-md:px-4 max-md:py-1 cursor-pointer scale-95 hover:scale-100 transition-all duration-300 flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-black px-7 py-2 text-sm font-semibold text-white shadow-[0_4px_15px_rgba(0,0,0,0.4)]  hover:shadow-[0_6px_20px_rgba(255,255,255,0.08)]">
                        Details
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </Slide>
            );
          })}
        </Slider>
        <DotGroup className="flex justify-center gap-2 mt-4" />

        <ButtonBack className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-[#0E0804] p-2 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <IoIosArrowBack className="md:text-3xl text-lg text-white" />
        </ButtonBack>

        <ButtonNext className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-[#0E0804] p-2 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <IoIosArrowForward className="md:text-3xl text-lg text-white" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
}
