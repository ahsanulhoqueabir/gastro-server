const express = require("express");
const {
  createPayment,
  completePayment,
  getPayment,
  getUserPayment,
} = require("../controller/paymentController");
const { verifyJWT } = require("../middleware/middleware");
const router = express.Router();
router.post("/create-payment-intent", verifyJWT, createPayment);
router.post("/completePayments", completePayment);
router.get("/all", verifyJWT, getPayment);
router.get("/mypayment", verifyJWT, getUserPayment);

module.exports = router;
