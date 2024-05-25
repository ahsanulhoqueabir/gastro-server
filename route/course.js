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
  verifyAdInst,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", verifyJWT, verifyAdmin, getCourses); // add verifyJWT, verifyAdmin,
router.post("/add", verifyJWT, verifyInstructor, addCourse); // add verifyJWT,verifyInstructor
router.get("/courses", approvedCourses);
router.get("/query", queryCourses);
router.get("/queryuser", queryByUser);
router.put("/update", verifyJWT, verifyAdInst, updateCourse);

module.exports = router;
