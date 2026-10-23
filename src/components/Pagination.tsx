import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4),
  );

  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg bg-[#252525] p-2 text-white transition hover:bg-[#383838] disabled:opacity-40"
      >
        <IoIosArrowBack size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm transition ${
            currentPage === page
              ? "bg-white font-semibold text-black"
              : "bg-[#252525] text-white hover:bg-[#383838]"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <span className="px-1 text-gray-500">...</span>
      )}

      {currentPage < totalPages - 2 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="rounded-lg bg-[#252525] px-3 py-2 text-sm text-white hover:bg-[#383838]"
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-[#252525] p-2 text-white transition hover:bg-[#383838] disabled:opacity-40"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
}