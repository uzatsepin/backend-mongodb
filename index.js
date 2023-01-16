import express from "express";
import mongoose from "mongoose";
import {
  registerValitadion,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

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

app.post("/login", loginValidation, UserController.login);
app.post("/register", registerValitadion, UserController.register);
app.get("/about", checkAuth, UserController.getAbout);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
