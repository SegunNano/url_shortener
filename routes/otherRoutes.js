import express from "express";
const router = express.Router();
import { getUrl, updateUrl, deleteUrl } from "../controllers/urlControllers.js";
import { isAuthor, isLoggedIn, isVerified } from "../middlewares/middlewares.js";
import { catchAsync } from "../utils/asyncHandlers.js";

router.route('/')
    .get((req, res) => {
        res.render('home');
    });

router.route('/:idx')
    .get(getUrl)
    .put(isLoggedIn, isAuthor, isVerified, catchAsync(updateUrl))
    .delete(isLoggedIn, isAuthor, isVerified, catchAsync(deleteUrl));



export default router;
