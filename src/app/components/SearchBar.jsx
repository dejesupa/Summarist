"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🧩 Fetch matching books when user types
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByCategoryOrTitle?search=${search}`
        );

        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); // ⏳ Debounce typing

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // 🧭 Navigate to book page
  const handleSelect = (id) => {
    setSearch("");
    setResults([]);
    router.push(`/book/${id}`);
  };

  return (
    <div className="search-wrapper">
      {/* 🔍 Input Field */}
      <div className="search__container">
        <input
          type="text"
          placeholder="Search for books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search__input"
        />
        <div className="search__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            />
          </svg>
        </div>
      </div>

      {/* 📚 Dropdown results */}
      {search && (
        <div className="search-dropdown">
          {loading ? (
            <p className="search-loading">Searching...</p>
          ) : results.length > 0 ? (
            results.map((book) => (
              <div
                key={book.id}
                className="search-result"
                onClick={() => handleSelect(book.id)}
              >
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="search-thumb"
                />
                <div>
                  <p className="search-title">{book.title}</p>
                  <p className="search-author">{book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="search-no-results">No books found</p>
          )}
        </div>
      )}
    </div>
  );
}
