// server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CASHFREE_CLIENT_ID;      // X-Client-Id (public-ish)
const CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET; // SECRET -> keep private
const API_VERSION = "2022-09-01"; // Cashfree header version

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn("CASHFREE_CLIENT_ID or CASHFREE_CLIENT_SECRET missing in .env");
}

// Create Cashfree order endpoint
app.post("/create-order", async (req, res) => {
  try {
    const { amount, customer_name, customer_email } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const headers = {
      "x-client-id": CLIENT_ID,
      "x-client-secret": CLIENT_SECRET,
      "x-api-version": API_VERSION,
      "Content-Type": "application/json",
    };

    const payload = {
      order_amount: Number(amount),
      order_currency: "INR",
      order_note: "Donation",
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: customer_name || "Guest",
        customer_email: customer_email || "no-reply@example.com"
      }
    };

    // Cashfree create order
    const cfResp = await axios.post(
      "https://api.cashfree.com/pg/orders",
      payload,
      { headers }
    );

    // Successful response includes payment_session_id and order_id
    const data = cfResp.data;
    return res.json({ ok: true, data });
  } catch (err) {
    console.error("Create-order error:", err.response?.data || err.message);
    return res.status(500).json({ error: true, message: "Order creation failed" });
  }
});

// Optional: health
app.get("/", (req, res) => res.send("Cashfree Order Server running"));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
