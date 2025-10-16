"use client";

import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import SearchBar from "./components/SearchBar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // hide search bar only on home page
  const hideSearchBar = pathname === "/";

  return (
    <div className="flex flex-col flex-1 relative">
      <Sidebar />

      {/* Conditional search bar */}
      {!hideSearchBar && (
        <div className="flex justify-end items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-50">
          <SearchBar />
        </div>
      )}

      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Full-width player */}
      <div id="global-player" className="player-bar-container"></div>
    </div>
  );
}
