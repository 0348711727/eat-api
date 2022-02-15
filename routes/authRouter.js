import express from 'express';
import { signUp, login, getCurrentUser } from "../controllers/auth.js";

const router = express.Router();


router.post("/signup", signUp);
router.post("/login", login);
router.post("/isauth", getCurrentUser);

export default router;