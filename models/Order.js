const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  tx_hash: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;