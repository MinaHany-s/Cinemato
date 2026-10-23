import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center text-white">
      <div className="relative mb-6">
        <MdMovie className="text-8xl text-neutral-700" />
        <span className="absolute -right-3 -top-2 rounded-full bg-[#2E2E2E] px-3 py-1 text-sm font-bold text-neutral-300">
          404
        </span>
      </div>

      <h1 className="mb-3 text-3xl font-bold sm:text-5xl">
        Lost in the Movies?
      </h1>

      <p className="mb-8 max-w-md text-sm leading-6 text-neutral-400 sm:text-base">
        Looks like this page is not in our collection. The movie you're looking
        for might have disappeared from the screen.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 rounded-xl bg-[#2E2E2E] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#414141] active:scale-95"
      >
        <FaHome />
        Back to Home
      </Link>
    </div>
  );
}
