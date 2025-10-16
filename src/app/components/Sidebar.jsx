"use client";

import Link from "next/link";
import Image from "next/image";
import { RiSettingsLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { GoHome, GoStar } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        {/* Logo */}
        <Link href="/" className="sidebar__logo">
          <Image
            src="/assets/logo.png"
            alt="Summarist logo"
            width={130}
            height={40}
          />
        </Link>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <Link href="/for-you" className="sidebar__link active">
            <span className="sidebar__icon--wrapper"><GoHome /></span>
            For you
          </Link>
          <Link href="/library" className="sidebar__link">
            <span className="sidebar__icon--wrapper"><IoBookOutline /></span>
            My Library
          </Link>
          <Link href="/highlights" className="sidebar__link">
            <span className="sidebar__icon--wrapper"><GoStar /></span>
            Highlights
          </Link>
          <Link href="/search" className="sidebar__link">
            <span className="sidebar__icon--wrapper"><AiOutlineSearch /></span>
            Search
          </Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="sidebar__bottom">
        <Link href="/settings" className="sidebar__link">
          <span className="sidebar__icon--wrapper"><RiSettingsLine /></span>
          Settings
        </Link>
        <Link href="/help" className="sidebar__link">
          <span className="sidebar__icon--wrapper">❓</span>
          Help & Support
        </Link>
        <Link href="/login" className="sidebar__link">
          <span className="sidebar__icon--wrapper"><FaRegUserCircle /></span>
          Login
        </Link>
      </div>
    </aside>
  );
}
