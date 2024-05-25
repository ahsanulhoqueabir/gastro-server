const express = require("express");
const {
  addFeedback,
  getFeedback,
} = require("../controller/feedbackController.js");
const { verifyJWT, verifyAdmin } = require("../middleware/middleware.js");
const router = express.Router();
router.post("/add", addFeedback);
router.get("/all", verifyJWT, verifyAdmin, getFeedback);
module.exports = router;
