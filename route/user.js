const express = require("express");
const {
  createUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getInstructor,
  queryUser,
  addSelectedClass,
  removeSelectedClass,
  updateRole,
} = require("../controller/user.js");
const { verifyAdmin, verifyJWT } = require("../middleware/middleware.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/create", createUser);
router.get("/alluser", getUsers);
router.get("/query", queryUser); // add verifyJWT
router.put("/add", addUser);
router.delete("/delete/:id", deleteUser);
router.put("/update", verifyJWT, updateUser);
router.get("/instructor", getInstructor);
router.put("/updaterole", verifyJWT, verifyAdmin, updateRole);
router.put("/addSelectedClass", verifyJWT, addSelectedClass); // add verifyJWT
router.delete("/RemoveClass", verifyJWT, removeSelectedClass); // add verifyJWT
module.exports = router;
