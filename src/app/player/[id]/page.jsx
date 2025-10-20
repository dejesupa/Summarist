"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "./PlayerPage.css";

export default function PlayerPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // 🎧 Audio logic states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // 🧠 Fetch book info
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch book data");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBook();
  }, [id]);

  // 🎧 Handlers
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = e.target.value;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // ✅ When the audio ends, mark book as finished
const handleAudioEnd = () => {
  if (!book) return;

  // Get existing finished books
  const finished = JSON.parse(localStorage.getItem("finishedBooks") || "[]");

  // Avoid duplicates
  const alreadyExists = finished.some((b) => b.id === book.id);
  if (alreadyExists) return;

  // Add the finished book
  finished.push(book);
  localStorage.setItem("finishedBooks", JSON.stringify(finished));

  alert(`✅ "${book.title}" has been marked as finished!`);
};


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!book) return <p className="error">Book not found.</p>;

  return (
  <>
    <div className="player-container">

      {/* 📘 Book Title */}
      <h1 className="player-title">{book.title}</h1>

      {/* 🧾 Summary */}
      <p className="player-summary">{book.summary}</p>
    </div>

    {/* 🎧 Audio Player (moved outside container for full width) */}
    <div className="player-bar">
      <div className="player-left">
        <Image
          src={book.imageLink}
          alt={book.title}
          width={45}
          height={65}
          className="player-cover"
        />
        <div>
          <p className="player-book-title">{book.title}</p>
          <p className="player-book-author">{book.author}</p>
        </div>
      </div>

      <div className="player-center">
        {/* ⏪ Back 10 seconds */}
        <button
          className="skip-btn skip-back"
          onClick={() => (audioRef.current.currentTime -= 10)}
          aria-label="Skip back 10 seconds"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <path d="M12 19V5l-8 7 8 7z" />
            <circle cx="19" cy="12" r="2" />
          </svg>
          <span className="skip-text">10</span>
        </button>

        {/* ▶️ / ⏸️ */}
        <button
          className="play-btn"
          onClick={handlePlayPause}
          aria-label="Play or pause"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon"
            >
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* ⏩ Forward 10 seconds */}
        <button
          className="skip-btn skip-forward"
          onClick={() => (audioRef.current.currentTime += 10)}
          aria-label="Skip forward 10 seconds"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <path d="M12 5v14l8-7-8-7z" />
            <circle cx="5" cy="12" r="2" />
          </svg>
          <span className="skip-text">10</span>
        </button>
      </div>

      <div className="player-right">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="player-slider"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      {/* Hidden audio element */}
      <audio
  ref={audioRef}
  src={book.audioLink}
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleLoadedMetadata}
  onEnded={handleAudioEnd} // 👈 this line is new
/>

    </div>
  </>
);

}
