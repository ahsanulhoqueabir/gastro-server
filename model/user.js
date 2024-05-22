const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    repassword: {
      type: String,
      minlength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    age: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: "https://placehold.co/500x500/000000/FFFFFF/png?text=User+image",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Custom"],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },

    enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    enrolledStudentCount: {
      type: Number,
      default: 0,
    },
    selected: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "users");
