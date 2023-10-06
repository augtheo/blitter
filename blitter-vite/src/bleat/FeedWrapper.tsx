import React from "react";

import Home from "./Home";
import Bleat from "./Bleat";
import User from "../profile/User";
import { Route, Routes } from "react-router-dom";

export default function FeedWrapper() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <main className="w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home followingOnly={false} />} />
            <Route path="home" element={<Home followingOnly={false} />} />
            <Route path="feed" element={<Home followingOnly={true} />} />
            <Route path="bleat/:id" element={<Bleat />} />
            <Route path="users/:id" element={<User />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
