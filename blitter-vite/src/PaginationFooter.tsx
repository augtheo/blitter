import React from "react";
import {
  BLITTER_APP_BLEAT_PAGE_SIZE,
  BLITTER_APP_BLEAT_MAX_PAGES,
} from "./utils/constant";
import { classNames } from "./utils/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function Page({ val, pos, target, active, setCurrentPage, route }) {
  const navigate = useNavigate();

  //TODO: Highlight active page differently
  return (
    <button
      className={classNames(
        pos === 0 ? "rounded-l-md " : "",
        pos === 1 ? "rounded-r-md " : "",
        active ? "ring-1 z-30 border-primary-600 " : "",
        "relative inline-flex items-center border  dark:bg-gray-800 border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 "
      )}
      onClick={() => {
        setCurrentPage(target);
        navigate(`?page=${target}`);
      }}
    >
      {val}
    </button>
  );
}

function RoundedPage({ val }) {
  return (
    <a
      href="#"
      className="relative inline-flex items-center rounded-md border  border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 dark:bg-gray-800"
    >
      {val}
    </a>
  );
}

function Paginator({ currentPage, totalResults, setCurrentPage }) {
  const navigate = useNavigate();
  let totalPages = Math.ceil(totalResults / BLITTER_APP_BLEAT_PAGE_SIZE);
  const maxPagesToShow = BLITTER_APP_BLEAT_MAX_PAGES;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  // Adjust startPage and endPage if there aren't enough pages to display
  const pagesToShow = endPage - startPage + 1;
  if (pagesToShow < maxPagesToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
  }

  // Generate an array of page numbers to display
  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  return (
    totalPages > 1 && (
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm "
        // className="top-0 z-10 bg-gray-800 fixed top-0 left-0 right-0 z-10"
        aria-label="Pagination"
      >
        {currentPage > 1 && (
          <button
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:bg-gray-800"
            onClick={() => navigate(`/home?page=${currentPage - 1}`)}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        {/* Render the "First" button if we're not on the first page */}
        {currentPage > 1 && (
          <Page
            active={false}
            val={"First"}
            pos={2}
            key={1}
            target={1}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* Render the page numbers */}
        {pages.map((page) => (
          <Page
            val={page}
            pos={
              page == 1 && currentPage == 1
                ? 0
                : page == totalPages && currentPage == totalPages
                ? 1
                : 2
            }
            key={page}
            target={page}
            active={page == currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}

        {/* Render the "Last" button if we're not on the last page */}
        {currentPage < totalPages && (
          <Page
            val={"Last"}
            pos={2}
            key={totalPages}
            target={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage < totalPages && (
          <button
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:bg-gray-800"
            onClick={() => navigate(`/home?page=${+currentPage + 1}`)}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </nav>
    )
  );
}

export default function PaginationFooter({
  currentPage,
  totalPages,
  totalResults,
  setCurrentPage,
}) {
  return (
    <div className="bottom-0 fixed left-0 right-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 text-gray-500 dark:bg-gray-900 dark:text-white sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {["Previous", "Next"].map((val) => (
          <RoundedPage val={val} key={val} />
        ))}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {
            <p
              className={`text-sm  ${
                totalResults > 0 ? "visible" : "invisible"
              }`}
            >
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * BLITTER_APP_BLEAT_PAGE_SIZE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  totalResults,
                  currentPage * BLITTER_APP_BLEAT_PAGE_SIZE
                )}
              </span>{" "}
              of <span className="font-medium">{totalResults}</span> results
            </p>
          }
        </div>
        <div>
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalResults={totalResults}
          />
        </div>
      </div>
    </div>
  );
}
