"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./SearchBar.css"; // 👈 import your CSS file

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSelect = (id) => {
    setSearch("");
    setResults([]);
    router.push(`/book/${id}`);
  };

  return (
    <div className="searchbar-container">
      {/* 🔍 Input field */}
      <div className="searchbar-input-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="searchbar-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar-input"
        />
      </div>

      {/* 📚 Dropdown results */}
      {search && (
        <div className="searchbar-dropdown">
          {loading ? (
            <p className="searchbar-message">Searching...</p>
          ) : results.length > 0 ? (
            results.map((book) => (
              <div
                key={book.id}
                onClick={() => handleSelect(book.id)}
                className="searchbar-item"
              >
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="searchbar-thumb"
                />
                <div>
                  <p className="searchbar-title">{book.title}</p>
                  <p className="searchbar-author">{book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="searchbar-message">No books found</p>
          )}
        </div>
      )}
    </div>
  );
}
