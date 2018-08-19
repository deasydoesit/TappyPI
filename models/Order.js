const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sciName: {
    type: String,
    required: true
  },
  range: {
    type: String,
    required: true
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;