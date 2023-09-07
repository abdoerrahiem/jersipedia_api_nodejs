import express from "express";
import { getCurrentUser, login, register } from "../controllers/userController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.use(auth);
router.get("/me", getCurrentUser);

export default router;
