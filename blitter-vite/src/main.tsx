import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AxiosNavigation } from "./utils/axios";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
rootElement.classList.add("dark:bg-gray-900");
rootElement.classList.add("bg-gray-50");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AxiosNavigation />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
