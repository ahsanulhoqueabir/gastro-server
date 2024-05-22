const Courses = require("../model/courses.js");
const Users = require("../model/user.js");
const addCourse = async (req, res) => {
  try {
    // const { name, description, price, duration, image } = req.body;
    const course = new Courses(req.body);
    // const Instructor = await Users.find({
    //   email: req.body.instructormail,
    // });
    // course.instructor = Instructor[0]._id;

    // const newCourse = await course.save();
    await course.save();

    await Users.updateOne(
      { email: req.body.instructormail },
      {
        $push: { course: course._id },
      }
    );

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const course = await Courses.find();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approvedCourses = async (req, res) => {
  try {
    const sortby = req.query.sortby;
    let query = {};
    const sorts = {};

    const courses = await Courses.find(
      { approveStatus: "approved" },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    ).populate("user", {
      name: 1,
      email: 1,
      phone: 1,
      photo: 1,
      gender: 1,
      address: 1,
    });

    courses.forEach((course) => {
      course.difference = course.totalSeats - course.seatsAvailable;
    });

    courses.sort((a, b) => b.difference - a.difference);

    courses.forEach((course) => {
      delete course.difference;
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const queryCourses = async (req, res) => {
  try {
    const query = req.query;
    // const course = await Courses.find(query);
    const course = await Courses.findById(req.query.id, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }).populate("user", {
      name: 1,
      email: 1,
      phone: 1,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const queryByUser = async (req, res) => {
  const id = req.query.id;
  try {
    const enrolled = await Courses.find({
      user: id,
    });
    const count = enrolled.reduce((total, curr) => {
      return total + (curr.totalSeats - curr.seatsAvailable);
    }, 0);

    res.status(200).json({
      data: {
        courses: enrolled,
        studentCount: count,
      },
    });
    // res.status(200).json(enrolled);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateCourse = async (req, res) => {
  const data = req.body;
  const id = req.query.id;
  try {
    const course = await Courses.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).send(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCourse,
  getCourses,
  approvedCourses,
  queryCourses,
  queryByUser,
  updateCourse,
};
