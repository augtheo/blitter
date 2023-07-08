import FourZeroFour from "./FourZeroFour";
import NavBar from "./NavBar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Bleat from "./bleat/Bleat";
import Feed from "./bleat/Feed";
import User from "./profile/User";
import Settings from "./Settings";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UnderMaintenance from "./UnderMaintenance";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || true
  );
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<NavBar darkMode={darkMode} setDarkMode={setDarkMode} />}>
        <Route path="/" element={<Feed authRequired={false} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bleat/:id" element={<Bleat />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/home" element={<Feed authRequired={true} />} />
      </Route>
      <Route path="/error" element={<UnderMaintenance />} />
      <Route path="*" element={<FourZeroFour />} />
    </Routes>
  );
}
