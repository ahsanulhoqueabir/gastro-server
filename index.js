const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const port = process.env.port || 5000;
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./route/user.js");
const courseRoute = require("./route/course.js");
const jwtRoute = require("./route/middleware.js");
const paymentRoute = require("./route/payment.js");
const feedback = require("./route/feedback.js");
const reviewsRoute = require("./route/reviews.js");

const app = express();
const corsOptions = { origin: true, Credential: true };

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Gastronomix Culinary Academy");
});

const dburi = process.env.MONGODB_URI;

const connection = async () => {
  try {
    await mongoose.connect(dburi);
    console.log("connected");
  } catch (err) {
    console.log("Error: ", err);
  }
};
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1", router);
app.use("/api/v1/verify", jwtRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/feedback", feedback);
app.use("/api/v1/reviews", reviewsRoute);

app.listen(port, () => {
  connection();
  console.log(`Server is running at ${port}`);
});
