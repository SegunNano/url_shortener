import express from "express";
import passport from "passport";
import { catchAsync } from "../utils/asyncHandlers.js";
import { logout, register, renderLogin, renderRegister, login, renderVerify, verify, changePassword, forgotPassword, resetPasswordPage, resetPassword } from "../controllers/authControllers.js";
import { isLoggedIn } from "../middlewares/middlewares.js";


const router = express.Router();

router.route('/register')
    .get(renderRegister)
    .post(catchAsync(register));

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: 'login', keepSessionInfo: true }), login);

router.route('/verify-email')
    .get(isLoggedIn, renderVerify)
    .post(isLoggedIn, catchAsync(verify));


router.route('/reset-password')
    .get(isLoggedIn, catchAsync(changePassword))
    .post(catchAsync(forgotPassword));


router.route('/reset-password/:resetPasswordToken')
    .get(catchAsync(resetPasswordPage))
    .patch(catchAsync(resetPassword));



router.get('/logout', logout);

export default router;