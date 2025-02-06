import express from "express";
import { catchAsync } from "../utils/asyncHandlers.js";
import { isLoggedIn } from "../middlewares/middlewares.js";
import { dashboard } from "../controllers/userControllers.js";




const router = express.Router();

router.route('/dashboard')
    .get(isLoggedIn, catchAsync(dashboard));



export default router;