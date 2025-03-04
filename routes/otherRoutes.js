import express from "express";
const router = express.Router();
import { getUrl, updateUrl, deleteUrl } from "../controllers/urlControllers.js";
import { isAuthor, isLoggedIn, isVerified } from "../middlewares/middlewares.js";
import { catchAsync } from "../utils/asyncHandlers.js";
import { changePassword, forgotPassword, resetPasswordPage } from "../controllers/authControllers.js";
import { resetPassword } from "../utils/email-html.js";

router.route('/')
    .get((req, res) => {
        res.render('home');
    });


router.route('/reset-password')
    .get(isLoggedIn, catchAsync(changePassword))
    .post(catchAsync(forgotPassword));


router.route('/reset-password/:resetPasswordToken')
    .get(catchAsync(resetPasswordPage))
    .patch(catchAsync(resetPassword));


router.route('/:idx')
    .get(getUrl)
    .put(isLoggedIn, isAuthor, isVerified, catchAsync(updateUrl))
    .delete(isLoggedIn, isAuthor, isVerified, catchAsync(deleteUrl));



export default router;
