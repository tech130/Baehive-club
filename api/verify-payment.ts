import type { VercelRequest, VercelResponse } from "@vercel/node";
import Razorpay from "razorpay";
import crypto from "crypto";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const {
    name,
    phone,
    email,
    city,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET as string;

  // 🔐 Step 1: Verify Signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  try {
    // ✅ Step 2: Create customer in Shopify
    await axios.post(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2026-01/customers.json`,
      {
        customer: {
          first_name: name,
          email: email,
          phone: phone,
          note: `City: ${city} | Lifetime Membership`,
          tags: "Lifetime Member",
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}