import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HockeyPage from "./pages/HockeyPage";
import GolfPage from "./pages/GolfPage";
import TennisPage from "./pages/TennisPage";
import FootballPage from "./pages/FootballPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router basename="/sportpulse-analytics" forceRefresh={true}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="nhl" element={<HockeyPage />} />
          <Route path="golf" element={<GolfPage />} />
          <Route path="tennis" element={<TennisPage />} />
          <Route path="nfl" element={<FootballPage />} />
          <Route path="*" element={<p className="p-6 text-center">Page Not Found</p>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;