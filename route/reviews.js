const express = require("express");
const {
  addReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controller/reviewControl.js");

const router = express.Router();
router.post("/add", addReview);
router.get("/all", getReviews);
router.get("/:id", getReviewById);
router.put("/update/:id", updateReview);
router.delete("/delete/:id", deleteReview);
module.exports = router;
