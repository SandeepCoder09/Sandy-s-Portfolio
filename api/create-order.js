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