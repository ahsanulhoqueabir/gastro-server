const Users = require("../model/user.js");

const createUser = async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.errorResponse);
  }
};

const getUsers = async (req, res) => {
  try {
    // const query = req.query;
    const users = await Users.find(
      {},
      {
        password: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
const addUser = async (req, res) => {
  const user = new Users(req.body);
  try {
    const currUser = await Users.findOne({
      email: req.body.email,
    });
    if (currUser) {
      return res.status(400).send("User already exists");
    } else {
      await user.save();
      res.status(201).send(user);
    }
  } catch (error) {
    res.status(400).send(error.errorResponse);
  }
};
const updateUser = async (req, res) => {
  const id = req.query.id;
  const updates = req.body;
  const options = { new: true };
  try {
    const user = await Users.findByIdAndUpdate(id, updates, options);
    !user ? res.status(404).send("User not found") : res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findByIdAndDelete(id);
    !user
      ? res.status(404).send("User not found")
      : res.status(200).send({
          message: "User Found",
          user,
        });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getInstructor = async (req, res) => {
  try {
    let users = await Users.find(
      { role: "instructor" },
      {
        password: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        isOnline: 0,
        enrolled: 0,
        selected: 0,
        isAdmin: 0,
      }
    ).populate("course", {
      className: 1,
      classDescription: 1,
      classImage: 1,
      classPrice: 1,
      approveStatus: 1,
      totalSeats: 1,
      seatsAvailable: 1,
      instructor: 1,
    });
    users = users.map((user) => {
      user.course = user.course.filter(
        (course) => course.approveStatus === "approved"
      );
      let stdCount = 0;
      user.course.forEach((course) => {
        stdCount += course.totalSeats - course.seatsAvailable;
      });
      user.enrolledStudentCount = stdCount;
      return user;
    });
    users.sort((a, b) => b.course.length - a.course.length);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
const queryUser = async (req, res) => {
  try {
    const query = req.query;
    const user = await Users.find(query, {
      password: 0,
      repassword: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    })
      .populate("course", {
        className: 1,
        classDescription: 1,
        classImage: 1,
        classPrice: 1,
        approveStatus: 1,
        totalSeats: 1,
        seatsAvailable: 1,
        feedback: 1,
      })
      .populate("selected", {
        instructor: 1,
        className: 1,
        classDescription: 1,
        classImage: 1,
        classPrice: 1,
        approveStatus: 1,
        totalSeats: 1,
        seatsAvailable: 1,
        instructormail: 1,
      })
      .populate("enrolled", {
        className: 1,
        classDescription: 1,
        classImage: 1,
        classPrice: 1,
        approveStatus: 1,
        totalSeats: 1,
        seatsAvailable: 1,
        instructormail: 1,
        instructor: 1,
      });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateRole = async (req, res) => {
  const role = req.query.role;
  const email = req.query.email;
  try {
    const user = await Users.findOneAndUpdate(
      {
        email: email,
      },
      {
        role: role,
      },
      {
        new: true,
      }
    );

    !user ? res.status(404).send("User not found") : res.send(user);
    // user.role = role;
    await user.save();
  } catch (err) {
    res.status(400).send(err);
  }
};
const addSelectedClass = async (req, res) => {
  const id = req.query.id;
  const course = req.query.course;
  // console.log(req.body);
  try {
    const user = await Users.findByIdAndUpdate(id, {
      // $push: { selected: course },
      $addToSet: {
        selected: course,
      },
    });
    !user ? res.status(404).send("User not found") : res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
const removeSelectedClass = async (req, res) => {
  const id = req.query.id;
  const course = req.query.course;
  try {
    const user = await Users.findByIdAndUpdate(id, {
      $pull: { selected: course },
    });
    !user ? res.status(404).send("User not found") : res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  addUser,
  getInstructor,
  queryUser,
  updateRole,
  addSelectedClass,
  removeSelectedClass,
};
