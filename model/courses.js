const mongoose = require("mongoose");
const User = require("../model/user.js");

const courseSchema = new mongoose.Schema(
  {
    instructor: { type: String },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    classDescription: {
      type: String,
      required: false,
      default: "",
    },
    classPrice: {
      type: Number,
      required: true,
    },
    classDuration: {
      type: Number, // in minutes
    },
    classImage: {
      type: String,
      required: false,
      default:
        "https://placehold.co/960x540/FFFFFF/000000/png?text=Course+Banner",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    approveStatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
    feedBack: {
      type: String,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    seatsAvailable: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    instructormail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Courses = mongoose.model("Courses", courseSchema, "courses");
module.exports = Courses;
