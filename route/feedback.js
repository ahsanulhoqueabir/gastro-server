const express = require("express");
const {
  addFeedback,
  getFeedback,
} = require("../controller/feedbackController.js");
const router = express.Router();
router.post("/add", addFeedback);
router.get("/all", getFeedback);
module.exports = router;
