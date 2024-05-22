const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    price: {
      type: Number,
    },
    traxId: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    instructorEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema, "payments");
