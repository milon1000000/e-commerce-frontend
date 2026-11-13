import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage,
  itemName = "items",
}) {
  if (totalPages <= 1 && (!totalItems || totalItems <= (itemsPerPage || 1))) {
    return null;
  }

  // Calculate range of items currently displayed
  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  // Generate intelligent page numbers (e.g. 1, 2, ..., 5, 6)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (page === "..." || page === currentPage) return;
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 w-full">
      {/* Items info */}
      <div className="text-xs sm:text-sm text-slate-500 font-medium">
        {totalItems ? (
          <span>
            Showing <strong className="text-slate-700">{startItem}</strong> to{" "}
            <strong className="text-slate-700">{endItem}</strong> of{" "}
            <strong className="text-slate-700">{totalItems}</strong> {itemName}
          </span>
        ) : (
          <span>
            Page <strong className="text-slate-700">{currentPage}</strong> of{" "}
            <strong className="text-slate-700">{totalPages}</strong>
          </span>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200 transition-all font-medium shadow-2xs"
        >
          <FaChevronLeft size={10} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-slate-400 text-xs sm:text-sm select-none"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              onClick={() => handlePageClick(page)}
              className={`min-w-8 h-8 px-2 text-xs sm:text-sm rounded-lg font-semibold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs hover:bg-blue-700"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-2xs"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200 transition-all font-medium shadow-2xs"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
