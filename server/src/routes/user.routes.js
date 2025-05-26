import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js";

const routes = new Router();

// Add routes
routes.route("/register").post(upload.single("avatar"), registerUser);

export default routes;
