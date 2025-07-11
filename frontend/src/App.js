import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HockeyPage from "./pages/HockeyPage";
import GolfPage from "./pages/GolfPage";
import TennisPage from "./pages/TennisPage";
import FootballPage from "./pages/FootballPage";
import Layout from "./components/ui/Layout";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";

function App() {
  return (
    <Router>
      <Layout>
        {/* Language switcher available site-wide */}
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/hockey" replace />} />
          <Route path="/hockey" element={<HockeyPage />} />
          <Route path="/golf" element={<GolfPage />} />
          <Route path="/tennis" element={<TennisPage />} />
          <Route path="/football" element={<FootballPage />} />
          {/* Optional: 404 Not Found Route */}
          <Route path="*" element={<p className="p-6 text-center">Page Not Found</p>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
