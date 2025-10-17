"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] text-center px-6">
      <h1 className="text-3xl font-bold text-[#032b41] mb-4">
        🎉 Subscription Activated!
      </h1>
      <p className="text-gray-700 mb-6 max-w-md">
        Thank you for subscribing to <strong>Summarist Premium</strong>! 
        You now have unlimited access to all summaries, audiobooks, and features.
      </p>

      <p className="text-sm text-gray-500 mb-8">
        Your 7-day free trial is now active. You can manage or cancel your plan anytime from your account.
      </p>

      <Link
        href="/"
        className="bg-[#2BD97C] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#26c36f] transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
