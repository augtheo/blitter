import React from "react";
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
import DismissableAlert from "./alerts";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || true
  );

  const [alertMessages, setAlertMessages] = useState([]);

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
    alertMessages &&
    alertMessages.map((alertMessage) => {
      return <DismissableAlert alertMessage={alertMessage} />;
    }) && (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              alertMessages={alertMessages}
              setAlertMessages={setAlertMessages}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <NavBar
              alertMessages={alertMessages}
              setAlertMessages={setAlertMessages}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        >
          <Route path="/" element={<Feed />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bleat/:id" element={<Bleat />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/home" element={<Feed />} />
        </Route>
        <Route path="/error" element={<UnderMaintenance />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    )
  );
}
