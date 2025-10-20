"use client";

import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../components/SkeletonLoader";

export default function SettingsPage() {
  const { isLoggedIn, user, setRedirectPath } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const router = useRouter();

  // 🟢 NEW: add local loading state for skeleton
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      router.refresh(); // instantly refreshes content
    }

    // simulate short load delay
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  // If user is NOT logged in → show login image
  if (!isLoggedIn) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] text-center px-6">
          <h1 className="text-3xl font-bold text-[#032b41] mb-6">Settings</h1>

          <Image
            src="/assets/login.png"
            alt="Login required"
            width={300}
            height={220}
            priority
          />

          <p className="mt-4 text-gray-600 mb-6">
            You need to log in to view your account details.
          </p>

          <button
            onClick={() => {
              setRedirectPath("/settings"); // 👈 ensure login returns here
              setShowLogin(true);
            }}
            className="bg-[#2BD97C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#27c06d] transition"
          >
            Login
          </button>
        </div>

        {showLogin && (
          <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        )}
      </>
    );
  }

  // 🟢 NEW: show skeleton loader before rendering user info
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] px-6">
        <h1 className="text-3xl font-bold text-[#032b41] mb-10">Settings</h1>

        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center border border-gray-200 space-y-4 animate-pulse">
          <SkeletonLoader width="60%" height="20px" />
          <SkeletonLoader width="40%" height="16px" />
          <SkeletonLoader width="80%" height="14px" />
          <SkeletonLoader width="50%" height="14px" />
          <SkeletonLoader width="100%" height="36px" rounded="md" />
        </div>
      </div>
    );
  }

  // If user IS logged in → show account info
  const { email, plan } = user || {};

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] px-6">
        <h1 className="text-3xl font-bold text-[#032b41] mb-10">Settings</h1>

        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Your Subscription Plan
          </h2>

          <p
            className={`text-xl font-bold mb-6 capitalize ${
              plan === "premium-plus"
                ? "text-[#2BD97C]"
                : plan === "premium"
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            {plan}
          </p>

          {plan === "basic" && (
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ interval: "year" }),
                  });

                  const data = await res.json();

                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert(data.error || "Something went wrong with checkout");
                  }
                } catch (err) {
                  console.error("Checkout error:", err);
                  alert("Failed to start checkout");
                }
              }}
              className="bg-[#2BD97C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#27c06d] transition"
            >
              Upgrade to Premium
            </button>
          )}

          <div className="mt-8 border-t pt-4">
            <p className="text-gray-500 text-sm mb-1">Email</p>
            <p className="text-gray-800 font-medium">{email}</p>
          </div>
        </div>
      </div>

      {showLogin && (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
