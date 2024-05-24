const reviews = require("../model/reviews");
const user = require("../model/user");
const addReview = async (req, res) => {
  try {
    const newReview = new reviews(req.body);
    await newReview.save();
    res.status(201).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getReviews = async (req, res) => {
  try {
    const allReviews = await reviews
      .find(
        {},
        {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        }
      )
      .sort({
        createdAt: -1,
        rating: -1,
      })
      .populate("user", {
        name: 1,
        email: 1,
        photo: 1,
        gender: 1,
      })
      .populate("instructor", {
        name: 1,
        email: 1,
        photo: 1,
        gender: 1,
      });
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await reviews
      .find(
        {
          instructor: req.params.id,
        },
        {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          instructor: 0,
        }
      )
      .populate("user", {
        name: 1,
        email: 1,
        photo: 1,
        gender: 1,
      })
      .sort({
        createdAt: -1,
        rating: -1,
      });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateReview = async (req, res) => {
  try {
    const { title, review, user, instructor } = req.body;
    await reviews.findByIdAndUpdate(
      req.params.id,
      { title, review, user, instructor },
      { new: true }
    );
    res.status(200).json({ message: "Review updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    await reviews.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
