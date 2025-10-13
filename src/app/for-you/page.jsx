"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

export default function ForYouPage() {
  // 🧠 State setup
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // 🌐 Fetch from all APIs
 useEffect(() => {
  async function fetchAllBooks() {
    try {
      const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
        fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        ),
        fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        ),
        fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        ),
      ]);

      if (!selectedRes.ok || !recommendedRes.ok || !suggestedRes.ok)
        throw new Error("Failed to fetch books");

      const [selectedData, recommendedData, suggestedData] = await Promise.all([
        selectedRes.json(),
        recommendedRes.json(),
        suggestedRes.json(),
      ]);

      // ✅ set single book (API returns an array)
      setSelectedBook(selectedData[0]);
      setRecommendedBooks(recommendedData);
      setSuggestedBooks(suggestedData);

      // 👇 Log book data to console
      console.log("Selected book data:", selectedData[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchAllBooks();
}, []); // ✅ make sure this closing bracket and semicolon exist

// ⏱️ Convert seconds into "X mins Y secs"
const formatDuration = (seconds) => {
  if (!seconds) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} mins ${secs} secs`;
};


  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-[#032b41]">
      {/* 🧭 Sidebar */}
      <aside className="w-[200px] bg-[#f1f6f4] flex flex-col justify-between py-4 px-3 border-r border-gray-200">
        <div>
          <Image
            src="/assets/logo.png"
            alt="Summarist logo"
            width={130}
            height={40}
            className="mx-auto mb-5"
          />

          <nav className="flex flex-col gap-3 text-sm">
            <a className="text-[#0365f2] font-semibold cursor-pointer relative before:content-[''] before:absolute before:-left-3 before:top-0 before:w-[2px] before:h-full before:bg-[#0365f2]">
              For you
            </a>
            <a className="hover:text-[#0365f2] cursor-pointer">My Library</a>
            <a className="hover:text-[#0365f2] cursor-pointer">Highlights</a>
            <a className="hover:text-[#0365f2] cursor-pointer">Search</a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-600">
          <a className="hover:text-[#0365f2] cursor-pointer flex items-center gap-2">
            <RiSettingsLine size={12} /> Settings
          </a>
          <a className="hover:text-[#0365f2] cursor-pointer flex items-center gap-2">
            <FaRegUserCircle size={12} /> Login
          </a>
        </div>
      </aside>

      {/* 📖 Main Content */}
      <div className="flex-1 flex flex-col px-10 py-8">
        {/* 🔍 Search Bar */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200 w-[260px]">
            <AiOutlineSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for books"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm w-full bg-transparent"
            />
          </div>
        </div>

{/* 🟨 Selected just for you */}
<section className="mb-12">
  <h2 className="text-[22px] font-bold text-[#032b41] mb-2">
    Selected just for you
  </h2>

  {loading ? (
    <div className="animate-pulse bg-[#fbefd6] rounded-md w-[900px] h-[120px]" />
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : selectedBook ? (
    <div className="flex justify-between w-2/3 bg-[#fbefd6] rounded-md p-6 mb-6 gap-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* LEFT SIDE — subtitle */}
      <div className="flex flex-col justify-center w-[40%] pr-6 border-r border-gray-300">
        <p className="text-[15px] text-[#032b41] font-medium leading-snug">
          {selectedBook.subTitle}
        </p>
      </div>

      {/* RIGHT SIDE — book info and play */}
      <div className="flex gap-4 w-[60%] items-center">
        {/* Book image */}
        <Image
          src={selectedBook.imageLink}
          alt={selectedBook.title}
          width={100}
          height={100}
          className="rounded-md object-cover hover:scale-[1.03] transition-transform duration-300"
          priority
        />

        {/* Book details */}
        <div className="flex flex-col">
          <h3 className="text-[16px] font-semibold text-[#032b41] mb-[2px]">
            {selectedBook.title}
          </h3>
          <p className="text-[13px] text-[#394547] mb-[6px]">
            {selectedBook.author}
          </p>

          {/* ▶ Play icon + duration */}
          <div className="flex items-center gap-2">
            <button className="bg-black rounded-full w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <p className="text-[13px] text-[#032b41]">
              {formatDuration(selectedBook.totalRating)}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-gray-500">No featured book available.</p>
  )}
</section>




        {/* 📚 Recommended for You */}
        <section className="mb-10">
          <h2 className="text-[22px] font-bold text-[#032b41] mb-4">
            Recommended For You
          </h2>
          <p className="font-light text-[#394547] mb-4">
            We think you’ll like these
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-5 gap-8 justify-center px-4">
              {recommendedBooks.slice(0, 5).map((book) => (
                <div
                  key={book.id}
                  className="relative scroll-snap-start p-8 pt-10 pb-3 rounded-md max-w-[200px] w-full bg-white text-[#032b41] hover:shadow-md transition-all duration-200"
                >
                  <div className="relative flex justify-center mb-3">
                    {book.subscriptionRequired && (
                      <span className="absolute top-2 right-2 bg-[#032b41] text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">
                        Premium
                      </span>
                    )}

                    <Image
                      src={book.imageLink}
                      alt={book.title}
                      width={150}
                      height={210}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <h3 className="font-semibold text-[15px] leading-tight mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-[13px] text-gray-600">{book.author}</p>
                  <p className="text-[12px] text-gray-500 mt-1">
                    ⭐ {book.averageRating} — {book.keyIdeas} key ideas
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🟦 Suggested Books */}
        <section>
          <h2 className="text-[22px] font-bold text-[#032b41] mb-4">
            Suggested Books
          </h2>
          <p className="font-light text-[#394547] mb-4">Browse those books</p>

          <div className="grid grid-cols-5 gap-8 justify-center px-4">
            {suggestedBooks.slice(0, 5).map((book) => (
              <div
                key={book.id}
                className="relative scroll-snap-start p-8 pt-10 pb-3 rounded-md max-w-[200px] w-full bg-white text-[#032b41] hover:shadow-md transition-all duration-200"
              >
                <div className="relative flex justify-center mb-3">
                  {book.subscriptionRequired && (
                    <span className="absolute top-2 right-2 bg-[#032b41] text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">
                      Premium
                    </span>
                  )}

                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={150}
                    height={210}
                    className="rounded-md object-cover"
                  />
                </div>

                <h3 className="font-semibold text-[15px] leading-tight mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-[13px] text-gray-600">{book.author}</p>
                <p className="text-[12px] text-gray-500 mt-1">
                  ⭐ {book.averageRating} — {book.keyIdeas} key ideas
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
