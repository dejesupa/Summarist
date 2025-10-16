"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";

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

        const [selectedData, recommendedData, suggestedData] =
          await Promise.all([
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

      {/* 📖 Main Content */}
      <div className="flex-1 flex flex-col items-center bg-[#f9f9f9] text-[#032b41] py-10">
        {/* Inner wrapper — controls width and centering */}
        <div className="w-full max-w-[1100px] px-6">
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
            <h2 className="text-[22px] font-bold text-[#032b41] mb-4">
              Selected just for you
            </h2>

            {loading ? (
              <div className="flex justify-between items-center bg-[#fbefd6] rounded-md p-6 mb-6 gap-6 shadow-sm hover:shadow-md transition-all duration-300 max-w-[900px]" />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : selectedBook ? (
                 <Link href={`/book/${selectedBook.id}`}> 
              <div className="flex justify-between items-center w-2/3 bg-[#fbefd6] rounded-md p-6 mb-6 gap-6 shadow-sm hover:shadow-md transition-all duration-300">
                {/* LEFT SIDE — subtitle */}
                <div className="flex flex-col justify-center w-[45%] pr-6 border-r border-gray-300">
                  <p className="text-[15px] text-[#032b41] font-medium leading-snug">
                    {selectedBook.subTitle}
                  </p>
                </div>

                {/* RIGHT SIDE — book info and play */}
                <div className="flex gap-5 w-[55%] items-center">
                  {/* Book image */}
                  <Image
                    src={selectedBook.imageLink}
                    alt={selectedBook.title}
                    width={110}
                    height={110}
                    className="rounded-md object-cover hover:scale-[1.03] transition-transform duration-300"
                    priority
                  />

                  {/* Book details */}
                  <div className="flex flex-col">
                    <h3 className="text-[17px] font-semibold text-[#032b41] mb-[3px]">
                      {selectedBook.title}
                    </h3>
                    <p className="text-[13px] text-[#394547] mb-[8px]">
                      {selectedBook.author}
                    </p>

                    {/* ▶ Play icon + duration */}
                    <div className="flex items-center gap-2">
                      <button className="bg-[#032b41] rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-4 h-4"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <p className="text-[13px] text-[#032b41] font-medium">
                        {formatDuration(selectedBook.totalAudioLength)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
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
                  <Link href={`/book/${book.id}`} key={book.id}>
                    <div className="relative scroll-snap-start p-6 rounded-md max-w-[200px] w-full bg-white text-[#032b41] hover:shadow-md transition-all duration-200 cursor-pointer">
                      {/* Image */}
                      <div className="relative flex justify-center mb-4">
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

                      <h3 className="font-semibold text-[16px] leading-snug mb-[8px] line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-[14px] text-[#6b757b] mb-[8px]">
                        {book.author}
                      </p>
                      <p className="text-[14px] text-[#394547] mb-[12px] leading-snug line-clamp-2">
                        {book.subTitle}
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#6b6b6b] mt-auto">
                        <span>⭐ {book.averageRating}</span>
                      </div>
                    </div>
                  </Link>
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
                <Link href={`/book/${book.id}`} key={book.id}>
                  <div className="relative scroll-snap-start p-6 rounded-md max-w-[200px] w-full bg-white text-[#032b41] hover:shadow-md transition-all duration-200 cursor-pointer">
                    {/* Image */}
                    <div className="relative flex justify-center mb-4">
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

                    <h3 className="font-semibold text-[16px] leading-snug mb-[8px] line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-[14px] text-[#6b757b] mb-[8px]">
                      {book.author}
                    </p>
                    <p className="text-[14px] text-[#394547] mb-[12px] leading-snug line-clamp-2">
                      {book.subTitle}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-[#6b6b6b] mt-auto">
                      <span>⭐ {book.averageRating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
