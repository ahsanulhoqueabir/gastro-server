const express = require("express");
const {
  addCourse,
  getCourses,
  approvedCourses,
  queryCourses,
  queryByUser,
  updateCourse,
} = require("../controller/courseController");
const {
  verifyJWT,
  verifyAdmin,
  verifyInstructor,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", getCourses); // add verifyJWT, verifyAdmin,
router.post("/add", addCourse); // add verifyJWT,verifyInstructor
router.get("/courses", approvedCourses);
router.get("/query", queryCourses);
router.get("/queryuser", queryByUser);
router.put("/update", updateCourse);

module.exports = router;
