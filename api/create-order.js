const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "SECRET:",
      process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "MISSING"
    );

    const { amount, donorName, donorMsg } = req.body;

    if (!amount || Number(amount) < 1) {
      return res.status(400).json({
        error: "Invalid amount",
      });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `support_${Date.now()}`,
      notes: {
        donorName: donorName || "Anonymous",
        donorMsg: donorMsg || "",
      },
    });

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);

    return res.status(500).json({
      error: error.message,
    });
  }
};