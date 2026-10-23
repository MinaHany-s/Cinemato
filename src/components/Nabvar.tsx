import { FaHome } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
export default function Nabvar() {
  // Handle scroll
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //   Handle Change between pages

  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full text-white
    
          ${scrolled ? "bg-black/70 backdrop-blur-sm shadow-lg" : "bg-black"}
    `}
    >
      <div className="mx-10 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="logo text-2xl ">Cinemato</h1>
          <div className="flex gap-2 max-md:hidden">
            <Link
              to={"/"}
              className={`flex items-center gap-2 
                ${pathname === "/" ? "bg-[#2E2E2E]" : ""}
                hover:bg-[#2E2E2E] px-3 rounded-3xl cursor-pointer transition-all duration-100`}
            >
              <FaHome className="text-sm" />
              <h2 className="text-sm md:text-lg">Home</h2>
            </Link>
            <Link
              to={"/movies"}
              className={`flex items-center gap-2 
                ${pathname === "/movies" ? "bg-[#2E2E2E]" : ""}
                hover:bg-[#2E2E2E] px-3 rounded-3xl cursor-pointer transition-all duration-100`}
            >
              <MdMovie className="text-sm" />
              <h2 className="text-sm md:text-lg">Movies</h2>
            </Link>
            <Link
              to={"/series"}
              className={`flex items-center gap-2 
                ${pathname === "/series" ? "bg-[#2E2E2E]" : ""}
                hover:bg-[#2E2E2E] px-3 rounded-3xl cursor-pointer transition-all duration-100`}
            >
              <BiCameraMovie className="text-sm" />
              <h2 className="text-sm md:text-lg">Series</h2>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link
          to={'/favorites'}
           className="cursor-pointer bg-[#1E1E1E] p-2 rounded-full">
            <CiHeart className="text-xl" />
          </Link>

          {/* For mobile screens*/}
          <div className="md:hidden flex cursor-pointer  bg-[#1E1E1E] p-2 rounded-full">
            <CiMenuBurger
              className="text-xl"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
          </div>
        </div>
      </div>
      {/* Menu bar */}
      <div
        className={`fixed top-0 right-0
      transition-all duration-200
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
         bg-[#0F0F0F] w-80 min-h-screen border-l border-l-gray-500 border-t border-t-gray-500`}
      >
        <div className="m-3 p-2 flex items-center justify-between text-xl">
          <h2 className=" font-semibold">Menu</h2>
          <HiOutlineXMark
            className="cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          />
        </div>
        <div className="w-full h-px bg-gray-500">
          <div className="flex gap-10 flex-col p-4">
            <Link
              to={"/"}
              className={`flex items-center gap-2 h-10
                ${pathname === "/" ? "bg-[#2E2E2E]" : ""}
                hover:bg-[#2E2E2E] px-3 rounded-3xl cursor-pointer transition-all duration-100`}
            >
              <FaHome className="text-sm" />
              <h2 className="text-sm md:text-lg">Home</h2>
            </Link>
            <Link
              to={"/movies"}
              className={`flex items-center gap-2 h-10
                ${pathname === "/movies" ? "bg-[#2E2E2E]" : ""}
                hover:bg-[#2E2E2E] px-3 rounded-3xl cursor-pointer transition-all duration-100`}
            >
              <MdMovie className="text-sm" />
              <h2 className="text-sm md:text-lg">Movies</h2>
            </Link>
            <Link
              to={"/series"}
              className={`flex items-center gap-2 h-10
                ${pathname === "/series" ? "bg-[#2E2E2E]" : ""}
                hover:bg-[#2E2E2E] px-3 rounded-3xl cursor-pointer transition-all duration-100`}
            >
              <BiCameraMovie className="text-sm" />
              <h2 className="text-sm md:text-lg">Series</h2>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
