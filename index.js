import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValitadion } from "./validations/auth.js";
import {validationResult} from "express-validator";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://andriiadm:Pa3wtj1X@cluster0.wyiedjg.mongodb.net/test").then(() => {
  console.log("DB OK");
}).catch((error) => {
  console.log("DB ERROR", error);
});

const app = express();
app.use(express.json());

app.post("/register", registerValitadion, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  })
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
