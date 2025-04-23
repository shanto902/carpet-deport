import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const maxVisiblePages = 5; // Adjust if needed
  const halfRange = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex justify-center items-center mt-8 space-x-2 w-full">
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
        className={` size-10 flex justify-center drop-shadow-md bg-secondary text-black items-center text-lg rounded-full transition-all duration-300${
          currentPage > 1
            ? "bg-white  hover:bg-primary hover:text-white"
            : "bg-white  cursor-not-allowed"
        }`}
        aria-disabled={currentPage <= 1}
      >
        &lt;
      </Link>

      {/* Page Numbers */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      ).map((page) => (
        <Link
          key={page}
          href={`/blog/page/${page}`}
          className={`size-10 flex justify-center items-center text-lg rounded-full transition-all duration-300 text-black ${
            currentPage === page
              ? "bg-primary text-white font-bold"
              : "bg-white  hover:bg-primary hover:text-white"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next Button */}
      <Link
        href={currentPage < totalPages ? `/blog/page/${currentPage + 1}` : "#"}
        className={`size-10 flex justify-center drop-shadow-md bg-secondary text-black items-center text-lg rounded-full transition-all duration-300 ${
          currentPage < totalPages
            ? "  hover:bg-primary hover:text-white"
            : " cursor-not-allowed"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        &gt;
      </Link>
    </div>
  );
};

export default Pagination;
