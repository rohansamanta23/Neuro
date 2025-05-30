import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const routes = new Router();

// Add routes
routes.route("/register").post(upload.single("avatar"), registerUser);

routes.route("/login").post(upload.none(), loginUser);

routes.route("/logout").post(verifyJWT, logoutUser);

export default routes;
