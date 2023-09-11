import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AxiosNavigation } from "./utils/axios";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AxiosNavigation />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
