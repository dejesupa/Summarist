"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { GoHome, GoStar } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // Hide sidebar on home + choose-plan pages
  if (pathname === "/" || pathname === "/choose-plan") return null;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ email: "", plan: "basic" });
    alert("You’ve been logged out.");
  };

  return (
    <>
      <aside className="sidebar">
        <div>
          {/*  Logo */}
          <Link href="/for-you" className="sidebar__logo">
            <Image
              src="/assets/logo.png"
              alt="Summarist logo"
              width={130}
              height={40}
              priority
            />
          </Link>

          {/*  Navigation */}
          <nav className="sidebar__nav">
            <Link href="/for-you" className="sidebar__link">
              <span className="sidebar__icon--wrapper"><GoHome /></span>
              For you
            </Link>

            <Link href="/library" className="sidebar__link">
              <span className="sidebar__icon--wrapper"><IoBookOutline /></span>
              My Library
            </Link>

            {/* Disabled Highlights */}
            <div className="sidebar__link sidebar__link--disabled">
              <span className="sidebar__icon--wrapper"><GoStar /></span>
              Highlights
            </div>

            {/* Disabled Search */}
            <div className="sidebar__link sidebar__link--disabled">
              <span className="sidebar__icon--wrapper"><AiOutlineSearch /></span>
              Search
            </div>
          </nav>
        </div>

        {/*  Bottom section */}
        <div className="sidebar__bottom">
          <Link href="/settings" className="sidebar__link">
            <span className="sidebar__icon--wrapper"><RiSettingsLine /></span>
            Settings
          </Link>

          {/* Disabled Help */}
          <div className="sidebar__link sidebar__link--disabled">
            <span className="sidebar__icon--wrapper">❓</span>
            Help & Support
          </div>

          {/* Login or Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="sidebar__link w-full text-left"
            >
              <span className="sidebar__icon--wrapper"><FaRegUserCircle /></span>
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="sidebar__link w-full text-left"
            >
              <span className="sidebar__icon--wrapper"><FaRegUserCircle /></span>
              Login
            </button>
          )}
        </div>
      </aside>

      {/*  Modal */}
      {showLogin && (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
