import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

export async function POST(req) {
  try {
    const { interval } = await req.json(); // "month" or "year"

    const priceId =
      interval === "year"
        ? process.env.STRIPE_PRICE_YEARLY
        : process.env.STRIPE_PRICE_MONTHLY;

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,

      // ✅ Redirect to Settings page after successful payment
      success_url: `${origin}/settings?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/choose-plan`,

      // ✅ Include 7-day trial for yearly plan
      subscription_data:
        interval === "year" ? { trial_period_days: 7 } : undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
