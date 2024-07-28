import express from "express";
import {sendMessage, getMessages}from "../controllers/message_controller.js"
import protectRoute from "../middlewares/prtectRoute.js";
const router = express.Router();

router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage) 

export default router;