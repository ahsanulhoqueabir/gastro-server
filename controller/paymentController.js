const Courses = require("../model/courses.js");
const Users = require("../model/user.js");
const payment = require("../model/payment.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.json());
// const { v4: uuidv4 } = require("uuid");
const createPayment = async (req, res) => {
  const { price } = await req.body;
  console.log(req.body);
  if (price == null || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Invalid price provided" });
  }
  const amount = Math.round(price * 100);
  if (price !== null) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  }
};
const completePayment = async (req, res) => {
  const { price, course, user, traxId, status } = req.body;
  await Courses.findByIdAndUpdate(course, {
    $inc: {
      seatsAvailable: -1,
    },
  });
  await Users.findByIdAndUpdate(user, {
    $push: {
      enrolled: course,
    },
    $pull: {
      selected: course,
    },
  });
  const newPayment = new payment({
    user: user,
    course: course,
    price: price,
    status: status,
    traxId: traxId,
  });
  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const payments = await payment.find(req.query);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserPayment = async (req, res) => {
  const id = req.query.id;
  try {
    const payments = await payment
      .find(
        {
          user: id,
        },
        {
          date: 1,
          traxId: 1,
          price: 1,
        }
      )
      .populate("course", {
        className: 1,
        instructor: 1,
        classImage: 1,
      })
      .sort({
        date: -1,
      });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getPayment,
  completePayment,
  getUserPayment,
};
