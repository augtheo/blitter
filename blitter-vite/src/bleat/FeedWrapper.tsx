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
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <main className="w-full">
          <div className="flex flex-col">
            <Routes>
              <Route path="/" element={<Home followingOnly={false} />} />
              <Route path="home" element={<Home followingOnly={false} />} />
              <Route path="feed" element={<Home followingOnly={true} />} />
              <Route path="bleat/:id" element={<Bleat />} />
              <Route path="users/:id" element={<User />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
