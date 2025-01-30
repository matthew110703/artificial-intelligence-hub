import { Router } from "express";

// Controllers
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRoutes = Router();

// Middleware
import authenticate from "../middleware/authenticate.js";
userRoutes.use(authenticate);

// Routes
userRoutes.route("/").get(getUser).put(updateUser).delete(deleteUser);

export default userRoutes;
