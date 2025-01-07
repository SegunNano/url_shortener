import express from "express";
import passport from "passport";
import { catchAsync } from "../utils/asyncHandlers.js";
import { logout, register, renderLogin, renderRegister, login } from "../controllers/userControllers.js";


const router = express.Router();


router.route('/register')
    .get(renderRegister)
    .post(catchAsync(register));

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login);

router.get('/logout', logout);

export default router;