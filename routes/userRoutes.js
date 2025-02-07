import express from "express";
import { catchAsync } from "../utils/asyncHandlers.js";
import { isLoggedIn } from "../middlewares/middlewares.js";
import { myurls } from "../controllers/userControllers.js";




const router = express.Router();

router.route('/myurls')
    .get(isLoggedIn, catchAsync(myurls));



export default router;