const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// Middlewares
app.use(cors());

// Perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const database =

// Schema Design
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  age: {
    type: String,
  },
  number: {
    type: String,
  },
  success: {
    type: String,
  },
  image: {
    type: String,
  },
});

// // Create Model
const User = mongoose.model("peoplehunt", userSchema);

// get all users data
app.get("/api/v1/users", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Data recived failed",
      error: err.message,
    });
  }
});

// Create User Data
app.post("/api/v1/users", async (req, res) => {
  try {
    const data = new User(req.body);
    const result = await data.save();
    res.status(200).json({
      status: "success",
      massage: "Data Inserted Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      massage: "Data is not inserted",
      error: err,
    });
  }
});

app.post(`/api/v1/user`, async (req, res) => {
  try {
    const id = req.body;

    const result = await User.updateOne(
      { _id: new ObjectId(id) },
      { $set: { success: "success" } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({
        status: "success",
        message: "Updated Success field",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "User was not updated",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "User was not updated",
      error: err,
    });
  }
});

app.get("/api/v1/users/success", async (req, res) => {
  try {
    const success = await User.find({ success: "success" });
    res.status(200).json({
      status: "success",
      massage: "Updated Success field",
      data: success,
    });
    console.log(success);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "User was not updated",
      error: err,
    });
  }
});

// user dynamic search
app.get("/api/v1/user/:name", async (req, res) => {
  try {
    const data = req.query;
    const result = await User.findfind({ name: /.*m.*/ });
    res.status(200).json({
      status: "success",
      massage: "Updated Success field",
      data: result,
    });
    console.log(success);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "User was not updated",
      error: err,
    });
  }
});

module.exports = app;
