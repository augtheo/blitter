import React from "react";
import BleatCard from "./BleatCard";
import PaginationFooter from "../PaginationFooter";

export default function BleatList({
  bleats,
  setBleats,
  currentPage,
  setCurrentPage,
  totalPages,
  totalResults,
}) {
  return (
    <>
      {bleats &&
        bleats.map((bleat) => {
          return (
            <BleatCard bleat={bleat} key={bleat.id} setBleats={setBleats} />
          );
        })}
      <PaginationFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalResults={totalResults}
      />
    </>
  );
}
