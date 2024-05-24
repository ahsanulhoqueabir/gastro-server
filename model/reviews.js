const mongoose = require("mongoose");
const reviewsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
