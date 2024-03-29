import React from "react";
import NavBar from "./NavBar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import FeedWrapper from "./bleat/FeedWrapper";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UnderMaintenance from "./UnderMaintenance";
import DismissableAlert, { AlertMessage } from "./components/Alert";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || "true",
  );

  const [alertMessages, setAlertMessages] = useState<AlertMessage[]>([]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode === "true") {
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
      <div className="bg-gray-50 dark:bg-gray-900 pt-16 pb-16">
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
          <Route path="/error" element={<UnderMaintenance />} />
          <Route
            path="*"
            element={
              <div>
                <NavBar
                  alertMessages={alertMessages}
                  setAlertMessages={setAlertMessages}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
                <FeedWrapper />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    )
  );
}
