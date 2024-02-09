const { CoreApi } = require('midtrans-client');
require("dotenv").config();

// Inisialisasi CoreApi Midtrans
const core = new CoreApi({
  isProduction: false, // Ganti menjadi true untuk produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY, // Ganti dengan Server Key Anda
  clientKey: process.env.MIDTRANS_CLIENT_KEY, // Ganti dengan Client Key Anda
});

class MidtransPayment {
  async generateToken(req, res) {
    try {
      const token = await core.clientToken.generate({});
      res.json(token);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate token' });
    }
  }

  async processPayment(req, res) {
    const { amountTotal, paymentMethod } = req.body;
    try {
      const transaction = await core.charge({
        payment_type: 'credit_card',
        transaction_details: {
          order_id: 'ORDER-123', // Ganti dengan ID pesanan Anda
          gross_amount: amountTotal,
        },
        credit_card: {
          token_id: paymentMethod, // Ganti dengan token kartu kredit yang diterima dari front-end
        },
      });
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process payment' });
    }
  }
}

const midtransController = new MidtransPayment();
module.exports = midtransController;
