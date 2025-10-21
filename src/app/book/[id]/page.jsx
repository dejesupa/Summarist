"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";
import "./BookPage.css";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, isSubscribed, setRedirectPath } = useAuth(); //  auth context
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //  Fetch book data
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

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-[#032b41]">
      {/* Top section skeleton */}
      <div className="flex justify-between w-full max-w-[900px] mb-10">
        <div className="flex flex-col gap-3 w-[55%]">
          <SkeletonLoader width="70%" height="22px" />
          <SkeletonLoader width="50%" height="18px" />
          <SkeletonLoader width="90%" height="14px" />
          <SkeletonLoader width="80%" height="14px" />
          <div className="flex gap-4 mt-2">
            <SkeletonLoader width="100px" height="32px" rounded="full" />
            <SkeletonLoader width="100px" height="32px" rounded="full" />
          </div>
        </div>
        <SkeletonLoader width="240px" height="340px" rounded="md" />
      </div>

      {/* Bottom description skeleton */}
      <div className="w-full max-w-[900px] flex flex-col gap-3">
        <SkeletonLoader width="40%" height="18px" />
        {[...Array(6)].map((_, i) => (
          <SkeletonLoader key={i} width="100%" height="14px" />
        ))}
      </div>
    </div>
  );
}

  if (error) return <p className="error-text">{error}</p>;
  if (!book) return <p className="error-text">Book not found</p>;

  //  Handlers
const handleReadOrListen = () => {
  if (!isLoggedIn) {
    // Remember what users want (redirect after login)
    setRedirectPath(
      book.subscriptionRequired ? "/choose-plan" : `/player/${book.id}`
    );
    setShowModal(true);
    return;
  }

  //  B.ii logic — Free book or subscribed user
  if (!book.subscriptionRequired || isSubscribed) {
    router.push(`/player/${book.id}`);
  } 
  //  Premium book but user not subscribed
  else if (book.subscriptionRequired && !isSubscribed) {
    router.push("/choose-plan");
  }
};

  const handleAddToLibrary = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    const existing = JSON.parse(localStorage.getItem("myLibrary") || "[]");
    const exists = existing.find((item) => item.id === book.id);

    if (exists) {
      alert("This book is already in your library.");
    } else {
      existing.push(book);
      localStorage.setItem("myLibrary", JSON.stringify(existing));
      alert("Book added to your library!");
    }
  };

  return (
    <>

      {/*  Main Book Page */}
      <div className="book-page">
        <div className="book-page__top">
          {/* LEFT — Book Details */}
          <div className="book-page__content">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">{book.author}</p>
            <p className="book-subtitle">{book.subTitle}</p>

            {/* 2x2 Info Grid */}
            <div className="book-info">
              <div>⭐ {book.averageRating} ({book.totalRating} ratings)</div>
              <div>⏱ 03:24</div>
              <div>🎧 Audio & Text</div>
              <div>💡 8 Key ideas</div>
            </div>

            {/* Read / Listen Buttons */}
            <div className="book-actions">
              <button onClick={handleReadOrListen} className="btn-primary">
                📘 Read
              </button>
              <button onClick={handleReadOrListen} className="btn-primary">
                🎧 Listen
              </button>
            </div>

            {/* Add to Library */}
            <p
              onClick={handleAddToLibrary}
              className="add-library cursor-pointer hover:underline"
            >
              🔖 Add title to My Library
            </p>
          </div>

          {/* RIGHT — Book Image */}
          <div className="book-page__image">
            <div className="book-image-wrapper">
              <Image
                src={book.imageLink}
                alt={book.title}
                width={240}
                height={340}
                className="book-image"
              />
              <div className="book-image-bg" />
            </div>
          </div>
        </div>

        {/*  About Section */}
        <div className="book-page__bottom">
          <h2 className="section-title">What's it about?</h2>
          <div className="book-tags">
            {book.tags?.map((tag) => (
              <span key={tag} className="book-tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="book-description">{book.bookDescription}</p>

          <h2 className="section-title">About the author</h2>
          <p className="book-author-description">{book.authorDescription}</p>
        </div>
      </div>

      {/*  Auth Modal */}
      {showModal && (
        <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
