"use client";

import "./ChoosePlan.css";
import Image from "next/image";
import { useState } from "react";

export default function ChoosePlanPage() {
  // Accordion Component
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

  // Plan Selection State
  const [selectedPlan, setSelectedPlan] = useState("yearly");

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
      {/* Paper Icon */}
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
      {/* Plant Icon */}
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
      {/* Handshake Icon */}
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
        onClick={() => setSelectedPlan("yearly")}
        className={`plan-card ${
          selectedPlan === "yearly" ? "active" : ""
        }`}
      >
        <div className="plan-header">
          <p className="plan-name">Premium Plus Yearly</p>
          <p className="plan-price">$99.99/year</p>
        </div>
        <p className="plan-desc">7-day free trial included</p>
      </div>

      {/* 🟨 Monthly Plan */}
      <div
        onClick={() => setSelectedPlan("monthly")}
        className={`plan-card ${
          selectedPlan === "monthly" ? "active" : ""
        }`}
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
              "Begin your complimentary 7-day trial with Summarist’s annual membership. You can cancel anytime before the trial ends to avoid being charged. After 7 days, your subscription automatically renews, and you’ll be billed the annual rate unless cancelled.",
          },
          {
            question:
              "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
            answer:
              "Absolutely! You can change your plan anytime from your account settings. The new plan and rate will take effect immediately after confirmation.",
          },
          {
            question: "What’s included in the Premium plan?",
            answer:
              "Premium gives you unlimited access to book summaries, audio versions, personalized recommendations, and offline listening through the Summarist mobile app.",
          },
          {
            question: "Can I cancel during my trial or subscription?",
            answer:
              "Yes, you can cancel anytime. If you cancel during your trial, you won’t be charged. If you cancel after your subscription starts, you’ll still have access until the end of your billing period.",
          },
        ].map((item, index) => (
          <Accordion key={index} item={item} />
        ))}
      </div>

      {/* ⚪ Footer */}
<footer className="footer">
  <div className="footer-columns">
    <div className="footer-col">
      <h4>Actions</h4>
      <ul>
        <li>Summarist Magazine</li>
        <li>Cancel Subscription</li>
        <li>Help</li>
        <li>Contact us</li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Useful Links</h4>
      <ul>
        <li>Pricing</li>
        <li>Summarist Business</li>
        <li>Gift Cards</li>
        <li>Authors & Publishers</li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Company</h4>
      <ul>
        <li>About</li>
        <li>Careers</li>
        <li>Partners</li>
        <li>Code of Conduct</li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Other</h4>
      <ul>
        <li>Sitemap</li>
        <li>Legal Notice</li>
        <li>Terms of Service</li>
        <li>Privacy Policies</li>
      </ul>
    </div>
  </div>

  <p className="footer-copy">Copyright © 2025 Summarist.</p>
</footer>

    </div>
  );
}
