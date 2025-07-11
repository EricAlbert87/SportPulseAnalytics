import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";      // Your global CSS (e.g., Tailwind)
import "./i18n";           // Initialize i18n translations

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
