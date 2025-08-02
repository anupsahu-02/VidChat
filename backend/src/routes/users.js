import { Router } from "express";
const router = Router();
import { login, register, getUserHistory, addToHistory, isValidToken } from "../controller/user.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);
router.route("/varify").get(isValidToken);

export default router;