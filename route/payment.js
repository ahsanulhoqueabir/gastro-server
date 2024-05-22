const express = require("express");
const {
  createPayment,
  completePayment,
  getPayment,
  getUserPayment,
} = require("../controller/paymentController");
const router = express.Router();
router.post("/create-payment-intent", createPayment);
router.post("/completePayments", completePayment);
router.get("/all", getPayment);
router.get("/mypayment", getUserPayment);

module.exports = router;
