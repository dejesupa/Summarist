"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from "../components/SkeletonLoader";

export default function LibraryPage() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch books from localStorage
  useEffect(() => {
    const loadLibrary = () => {
      const saved = JSON.parse(localStorage.getItem("myLibrary") || "[]");
      const finished = JSON.parse(localStorage.getItem("finishedBooks") || "[]");
      setSavedBooks(saved);
      setFinishedBooks(finished);
      setLoading(false);
    };

    // Small timeout to show skeletons briefly
    setTimeout(loadLibrary, 600);
  }, []);

  //  Skeleton Loader View
  if (loading) {
    return (
      <div className="flex flex-col items-center bg-[#f9f9f9] text-[#032b41] min-h-screen py-12">
        <h1 className="text-3xl font-bold mb-10">My Library</h1>

        {/* Saved Books Skeleton */}
        <section className="w-full max-w-[1100px] mb-12">
          <h2 className="text-[22px] font-semibold mb-4">Saved Books</h2>
          <div className="grid grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="space-y-3 bg-white p-6 rounded-md shadow-sm animate-pulse"
              >
                <SkeletonLoader width="150px" height="210px" rounded="md" />
                <SkeletonLoader width="90%" height="16px" />
                <SkeletonLoader width="70%" height="14px" />
              </div>
            ))}
          </div>
        </section>

        {/* Finished Books Skeleton */}
        <section className="w-full max-w-[1100px]">
          <h2 className="text-[22px] font-semibold mb-4">Finished Books</h2>
          <div className="grid grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="space-y-3 bg-white p-6 rounded-md shadow-sm animate-pulse"
              >
                <SkeletonLoader width="150px" height="210px" rounded="md" />
                <SkeletonLoader width="90%" height="16px" />
                <SkeletonLoader width="70%" height="14px" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  //  Empty State (no books)
  if (savedBooks.length === 0 && finishedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#f9f9f9] text-[#032b41]">
        <h1 className="text-3xl font-bold mb-6">My Library</h1>
        <Image
          src="/assets/empty-library.png"
          alt="Empty Library"
          width={260}
          height={200}
        />
        <p className="mt-4 text-gray-600">
          You haven’t saved or finished any books yet.
        </p>
        <Link
          href="/foryou"
          className="mt-6 bg-[#2BD97C] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#27c06d] transition"
        >
          Discover Books
        </Link>
      </div>
    );
  }

  //  Main Render (real data)
  return (
    <div className="flex flex-col items-center bg-[#f9f9f9] text-[#032b41] min-h-screen py-12">
      <h1 className="text-3xl font-bold mb-10">My Library</h1>

      {/* Saved Books */}
      {savedBooks.length > 0 && (
        <section className="w-full max-w-[1100px] mb-12">
          <h2 className="text-[22px] font-semibold mb-4">Saved Books</h2>
          <div className="grid grid-cols-5 gap-8">
            {savedBooks.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <div className="bg-white rounded-md p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={150}
                    height={210}
                    className="rounded-md object-cover mb-3"
                  />
                  <h3 className="font-semibold text-[16px] line-clamp-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-[14px] text-gray-500">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Finished Books */}
      {finishedBooks.length > 0 && (
        <section className="w-full max-w-[1100px]">
          <h2 className="text-[22px] font-semibold mb-4">Finished Books</h2>
          <div className="grid grid-cols-5 gap-8">
            {finishedBooks.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <div className="bg-white rounded-md p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={150}
                    height={210}
                    className="rounded-md object-cover mb-3"
                  />
                  <h3 className="font-semibold text-[16px] line-clamp-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-[14px] text-gray-500">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
