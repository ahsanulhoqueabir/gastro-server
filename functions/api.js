const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const port = process.env.port || 5000;
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("../route/user.js");
const courseRoute = require("../route/course.js");
const jwtRoute = require("../route/middleware.js");
const paymentRoute = require("../route/payment.js");
const feedback = require("../route/feedback.js");
const reviewsRoute = require("../route/reviews.js");

const app = express();
const corsOptions = { origin: true, Credential: true };

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Gastronomix Culinary Academy");
});

const dburi = process.env.MONGODB_URI;
mongoose
  .connect(dburi)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
app.use(express.json());
app.use(cors(corsOptions));

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ token });
});
app.use("/.netlify/functions/api/v1", router);
app.use("/.netlify/functions/api/v1/verify", jwtRoute);
app.use("/.netlify/functions/api/v1/users", userRoute);
app.use("/.netlify/functions/api/v1/courses", courseRoute);
app.use("/.netlify/functions/api/v1/payment", paymentRoute);
app.use("/.netlify/functions/api/v1/feedback", feedback);
app.use("/.netlify/functions/api/v1/reviews", reviewsRoute);

module.exports.handler = serverless(app);
