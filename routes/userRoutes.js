import express from "express";
import passport from "passport";
import { catchAsync } from "../utils/asyncHandlers.js";
import { logout, register, renderLogin, renderRegister, login, renderVerify, verify } from "../controllers/userControllers.js";
import { isLoggedIn, isVerified } from "../middlewares/middlewares.js";


const router = express.Router();


router.route('/register')
    .get(renderRegister)
    .post(catchAsync(register));

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: false, failureRedirect: 'login', keepSessionInfo: true }), login);

router.route('/verify-email')
    .get(isLoggedIn, renderVerify)
    .post(isLoggedIn, catchAsync(verify));

router.get('/logout', logout);

export default router;