import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Disable body parsing for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // ✅ Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("💰 Payment successful for:", session.customer_email);

    // 🟢 TEMP: simulate saving plan to a JSON file (like a database)
    const dataPath = path.join(process.cwd(), "userData.json");
    const userData = {
      email: session.customer_email,
      plan: "premium",
    };

    fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2));
    console.log("📝 User plan updated to premium!");
  }

  return NextResponse.json({ received: true });
}
