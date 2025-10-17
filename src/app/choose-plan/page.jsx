"use client";

import "./ChoosePlan.css";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function ChoosePlanPage() {
  // ✅ 1. Define your state hooks first
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [isPending, startTransition] = useTransition();

  // ✅ 2. Then define handleCheckout() at the top level (not inside Accordion)
  async function handleCheckout(interval) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interval }),
        });

        const data = await res.json();
        if (data.url) window.location.href = data.url;
        else alert(data.error || "Something went wrong");
      } catch (err) {
        console.error(err);
        alert("Failed to start checkout");
      }
    });
  }

  // ✅ 3. Accordion should be below — handleCheckout should NOT be inside it
  function Accordion({ item }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="accordion-item">
        <button onClick={() => setOpen(!open)} className="accordion-btn">
          <span className="accordion-question">{item.question}</span>
          <span className="accordion-toggle">{open ? "−" : "+"}</span>
        </button>
        {open && <p className="accordion-answer">{item.answer}</p>}
      </div>
    );
  }

  return (
    <div className="choose-plan">
      {/* 🌊 Header Section */}
      <div className="choose-plan__header">
        <div className="choose-plan__text">
          <h1>Get unlimited access to many amazing books to read</h1>
          <p>Turn ordinary moments into amazing learning opportunities</p>
        </div>

        <div className="choose-plan__illustration">
          <Image
            src="/assets/pricing-top.png"
            alt="Pricing Top Illustration"
            width={260}
            height={260}
          />
        </div>
      </div>

      {/* 💡 Features Section */}
      <div className="features">
        <div className="feature">
          <div className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#032b41">
              <path d="M6 2a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z" />
            </svg>
          </div>
          <p className="feature-title">
            <strong>Key ideas in few min</strong> with many books to read
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#032b41">
              <path d="M12 2a7 7 0 0 0-7 7c0 3.866 3.134 7 7 7s7-3.134 7-7a7 7 0 0 0-7-7zM5 15c1.657 0 3 1.343 3 3v4h8v-4c0-1.657 1.343-3 3-3H5z" />
            </svg>
          </div>
          <p className="feature-title">
            <strong>3 million</strong> people growing with Summarist everyday
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#032b41">
              <path d="M2 9h4l3 3 2-2 4 4 2-2 5 5v3H2V9z" />
            </svg>
          </div>
          <p className="feature-title">
            <strong>Precise recommendations</strong> collections curated by experts
          </p>
        </div>
      </div>

      {/* 🟩 Yearly Plan */}
      <div
        onClick={() => {
          setSelectedPlan("yearly");
          handleCheckout("year");
        }}
        className={`plan-card ${selectedPlan === "yearly" ? "active" : ""}`}
      >
        <div className="plan-header">
          <p className="plan-name">Premium Plus Yearly</p>
          <p className="plan-price">$99.99/year</p>
        </div>
        <p className="plan-desc">7-day free trial included</p>
      </div>

      {/* 🟨 Monthly Plan */}
      <div
        onClick={() => {
          setSelectedPlan("monthly");
          handleCheckout("month");
        }}
        className={`plan-card ${selectedPlan === "monthly" ? "active" : ""}`}
      >
        <div className="plan-header">
          <p className="plan-name">Premium Monthly</p>
          <p className="plan-price">$9.99/month</p>
        </div>
        <p className="plan-desc">Cancel anytime</p>
      </div>

      {/* ❓ FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {[
          {
            question: "How does the free 7-day trial work?",
            answer:
              "Begin your complimentary 7-day trial with Summarist’s annual membership. You can cancel anytime before the trial ends to avoid being charged.",
          },
          {
            question: "Can I switch subscriptions?",
            answer:
              "Absolutely! You can change your plan anytime from your account settings.",
          },
          {
            question: "What’s included in the Premium plan?",
            answer:
              "Premium gives you unlimited access to summaries, audio, and offline listening.",
          },
          {
            question: "Can I cancel during my trial or subscription?",
            answer:
              "Yes. If you cancel during your trial, you won’t be charged.",
          },
        ].map((item, index) => (
          <Accordion key={index} item={item} />
        ))}
      </div>

      {/* ⚪ Footer */}
      <footer className="footer">
        <div className="footer-columns">
          {/* (Footer columns unchanged) */}
        </div>
        <p className="footer-copy">Copyright © 2025 Summarist.</p>
      </footer>
    </div>
  );
}
