const express = require("express");
const {
  createPayment,
  completePayment,
  getPayment,
  getUserPayment,
} = require("../controller/paymentController");
const { verifyJWT, verifyAdmin } = require("../middleware/middleware");
const router = express.Router();
router.post("/create-payment-intent", createPayment);
router.post("/completePayments", completePayment);
router.get("/all", verifyJWT, verifyAdmin, getPayment);
router.get("/mypayment", verifyJWT, getUserPayment);

module.exports = router;
