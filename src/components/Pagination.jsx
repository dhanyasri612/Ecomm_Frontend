import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({
  currentPage = 1,
  onPageChange,
  totalPages,
  nextPageText = <ChevronRight size={18} />,
  prevPageText = <ChevronLeft size={18} />,
  firstPageText = <ChevronsLeft size={18} />,
  lastPageText = <ChevronsRight size={18} />,
}) => {
  const { totalPages: storeTotalPages, products } = useSelector(
    (state) => state.product,
  );
  const total = totalPages || storeTotalPages || 1;
  if (!products || products.length === 0 || total <= 1 || !onPageChange)
    return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 1;
    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(total, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
        {/*First & prev*/}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-9 w-9 rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {firstPageText}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {prevPageText}
          </button>
        </div>
        {/*Page number*/}
        <div className="flex gap-1">
          {getPageNumbers().map((number) => (
            <button
              type="button"
              key={number}
              onClick={() => onPageChange(number)}
              className={`h-9 min-w-9 rounded-md border px-3 text-sm font-semibold transition ${
                number === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        {/*Next & Last*/}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === total}
            className="h-9 w-9 rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {nextPageText}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(total)}
            disabled={currentPage === total}
            className="h-9 w-9 rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {lastPageText}
          </button>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500">
        Page {currentPage} of {total}
      </p>
    </div>
  );
};

export default Pagination;
