const crypto = require("crypto");

module.exports = async (req, res) => {

  try {

    if (req.method !== "POST") {

      return res.status(405).json({
        error: "Method not allowed",
      });

    }

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

    } = req.body;

    const body =

      razorpay_order_id +

      "|" +

      razorpay_payment_id;

    const expected = crypto

      .createHmac(

        "sha256",

        process.env.RAZORPAY_KEY_SECRET

      )

      .update(body)

      .digest("hex");

    if (expected === razorpay_signature) {

      return res.status(200).json({

        success: true,

      });

    }

    return res.status(400).json({

      success: false,

    });

  } catch (error) {

    return res.status(500).json({

      error: error.message,

    });

  }
};