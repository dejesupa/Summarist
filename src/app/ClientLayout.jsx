"use client";

import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import SearchBar from "./components/SearchBar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // 🧭 Hide search bar on home and choose-plan pages
  const hideSearchBar = pathname === "/" || pathname === "/choose-plan";

  return (
    <div className="flex min-h-screen w-full">
      {/* 🧩 Persistent Sidebar */}
      <Sidebar />

      {/* 📖 Main content area */}
      <div className="flex flex-col flex-1 relative">
        {/* 🔍 Conditional search bar */}
        {!hideSearchBar && (
          <div className="flex justify-end items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-50">
            <SearchBar />
          </div>
        )}

        {/* 🧠 Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* 🎵 Global player area */}
        <div id="global-player" className="player-bar-container"></div>
      </div>
    </div>
  );
}
