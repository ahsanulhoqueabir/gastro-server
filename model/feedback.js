const mongoose = require("mongoose");
const User = require("../model/user.js");

const feedbackSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // instructor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
