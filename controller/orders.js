const orderModel = require("../models/orders");

class Order {
  async getAllOrders(req, res) {
    try {
      let orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (orders) {
        return res.json({ orders });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    try {
      let order = await orderModel
        .find({ user: uId })
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      return res.json({ order });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postCreateOrder(req, res) {
    const { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (!allProduct || !user || !amount || !transactionId || !address || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      let newOrder = new orderModel({
        allProduct,
        user,
        amount,
        transactionId,
        address,
        phone,
      });
      let save = await newOrder.save();
      if (save) {
        return res.json({ success: "Order created successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postUpdateOrder(req, res) {
    const { oId, status } = req.body;
    if (!oId || !status) {
      return res.status(400).json({ error: "Order ID and status are required" });
    }
    try {
      let currentOrder = await orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      if (currentOrder) {
        return res.json({ success: "Order updated successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postDeleteOrder(req, res) {
    const { oId } = req.body;
    if (!oId) {
      return res.status(400).json({ error: "Order ID is required" });
    }
    try {
      let deleteOrder = await orderModel.findByIdAndDelete(oId);
      if (deleteOrder) {
        return res.json({ success: "Order deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
