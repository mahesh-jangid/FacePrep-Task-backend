import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();
import { authUser, registerUser } from "../controlers/userControler.js";

router.route("/register").post(registerUser);

router.post("/login", authUser);

export default router;
