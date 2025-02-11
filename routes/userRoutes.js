import express from "express";
import { catchAsync } from "../utils/asyncHandlers.js";
import { isLoggedIn, isVerified } from "../middlewares/middlewares.js";
import { myurls, updateProfile } from "../controllers/userControllers.js";




const router = express.Router();

router.route('/myurls')
    .get(isLoggedIn, catchAsync(myurls));

router.route('/update-profile')
    .patch(isLoggedIn, isVerified, catchAsync(updateProfile));




export default router;