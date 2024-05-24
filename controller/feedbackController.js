const Feedback = require("../model/feedback.js");
const addFeedback = async (req, res) => {
  try {
    const { email, message } = req.body;
    const feedback = new Feedback({
      email,
      message,
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).sort({
      createdAt: -1,
    });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addFeedback, getFeedback };
