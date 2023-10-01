import React from "react";
import PaginationFooter from "../PaginationFooter";
import axios from "../utils/axios";
import BleatList from "./BleatList";
import { useState, useEffect } from "react";
import { Outlet, Route, Routes, useSearchParams } from "react-router-dom";

import { PhotoIcon } from "@heroicons/react/20/solid";
import Home from "./Home";
import Bleat from "./Bleat";
import User from "../profile/User";

export default function FeedWrapper({ route }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <main className="w-3/5">
          <div className="flex flex-col">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    followingOnly={false}
                    setTotalResults={setTotalResults}
                    setTotalPages={setTotalPages}
                    searchParams={searchParams}
                  />
                }
              />
              <Route
                path="home"
                element={
                  <Home
                    followingOnly={false}
                    setTotalResults={setTotalResults}
                    setTotalPages={setTotalPages}
                    searchParams={searchParams}
                  />
                }
              />
              <Route
                path="feed"
                element={
                  <Home
                    followingOnly={true}
                    setTotalResults={setTotalResults}
                    setTotalPages={setTotalPages}
                    searchParams={searchParams}
                  />
                }
              />
              <Route path="bleat/:id" element={<Bleat />} />
              <Route path="users/:id" element={<User />} />
            </Routes>
          </div>
        </main>
      </div>
      <PaginationFooter
        route={route}
        currentPage={searchParams.get("page") || 1}
        totalPages={totalPages}
        totalResults={totalResults}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
