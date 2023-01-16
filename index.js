import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { registerValitadion } from "./validations/auth.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://andriiadm:Pa3wtj1X@cluster0.wyiedjg.mongodb.net/blog")
  .then(() => {
    console.log("DB OK");
  })
  .catch((error) => {
    console.log("DB ERROR", error);
  });

const app = express();
app.use(express.json());

app.post("/register", registerValitadion, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Реєстрація невдала",
    });
  }
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
