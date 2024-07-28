import express from "express";
import protectRoute from "../middlewares/prtectRoute.js";
import { getUsersForSidebar } from "../controllers/user_controller.js";
const router = express.Router();

router.get("/",protectRoute,getUsersForSidebar)

export default router;