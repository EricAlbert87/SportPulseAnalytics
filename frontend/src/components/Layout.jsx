// frontend/src/components/Layout.jsx

import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import LanguageSwitcher from "./ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Layout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light dark:bg-primary text-gray-900 dark:text-white">
      {/* Navigation Bar */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-secondary shadow-md">
        <div className="text-2xl font-bold text-primary dark:text-white">
          SportPulse
        </div>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold text-accent" : "text-gray-700 dark:text-gray-300"
            }
          >
            {t("nav.home")}
          </NavLink>
          <NavLink
            to="/nhl"
            className={({ isActive }) =>
              isActive ? "font-semibold text-accent" : "text-gray-700 dark:text-gray-300"
            }
          >
            NHL
          </NavLink>
          <NavLink
            to="/golf"
            className={({ isActive }) =>
              isActive ? "font-semibold text-accent" : "text-gray-700 dark:text-gray-300"
            }
          >
            Golf
          </NavLink>
          <NavLink
            to="/tennis"
            className={({ isActive }) =>
              isActive ? "font-semibold text-accent" : "text-gray-700 dark:text-gray-300"
            }
          >
            Tennis
          </NavLink>
          <NavLink
            to="/nfl"
            className={({ isActive }) =>
              isActive ? "font-semibold text-accent" : "text-gray-700 dark:text-gray-300"
            }
          >
            NFL
          </NavLink>

          <LanguageSwitcher />
        </nav>
      </header>

      {/* Main Page Content */}
      <main className="p-6 max-w-screen-xl mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} SportPulse Analytics — All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
