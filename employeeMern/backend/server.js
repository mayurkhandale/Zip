require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = process.env.PORT | 4000;
const dataModel = require("./Model/DataModel");
const coonectDb = require("./Database/db");
/// this two for Authetication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
coonectDb();
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const dbStorage = multer.memoryStorage({});
const upload = multer({ storage: dbStorage });

app.use(express.json({ extends: true }));
// this is get call for getting data
app.get("/read", async (req, res) => {
  console.log("trigger");
  let findeData = await dataModel.find({});

  res.status(200).json({ messagae: "data from server", data: findeData });
});
// this is update call to update employee data
app.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    let findAndUpdate = await dataModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    return res.status(200).json({ message: "Employee Updated Successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// this is delete call to delete employee
app.delete("/delete/:id", async (req, res) => {
  console.log(req.params, "29::");
  try {
    let FindAndDelete = await dataModel.findByIdAndDelete(req.params.id);
    console.log(FindAndDelete, "42::");
    res.json({ message: "Data Deleted Succesfully" });
    if (!FindAndDelete) {
      res.status(400).send({ message: "not user Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "soething went wrong" });
    console.log(error, "34::");
  }
});
// this is post call to  create employee data
app.post("/write", upload.single("image"), async (req, res) => {
  try {
    const { data } = req.body;
    console.log(JSON.parse(data), req.file, "11");
    let uploadata = { ...JSON.parse(data), image: req.file };
    const { id } = uploadata;
    console.log(uploadata, "68::");
    const existingData = await dataModel.findOne({ id });
    if (existingData) {
      // Document already exists, handle the situation accordingly
      return res.status(400).json({ message: "Data already exists" });
    }
    const newData = new dataModel(uploadata);
    await newData.save();

    res.json({ message: "data Added Succesfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  //here is will be logic for login authentication
});
const users = [
  // In a real app, users would be stored in a database
  {
    id: 1,
    email: "mayur@example.com",
    password: "$2a$10$9CzKnL4RDa7O0P1gYhDFEOdcSCzyjxZlAe5y7y4TSrjVf54/xqLeK",
  }, // password is 'password123'
];

app.post("/login", async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.email == username);
    if (!user) res.status(400).json({ message: "Invalid Email or Password" });
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    console.log(token, "89::");
    res.json({ token });
  } catch (error) {
    console.log("Error in login route ", error.message, error);
    res.status(500).json({ error: " internal eroor  ... " });
  }
});

// server running on port
app.listen(port, () => {
  console.log(`server is running on port`, port);
});
