import express from "express";
const router = express.Router();
import { getForm, saveUrl, renderUrl, getUrl } from "../controllers/urlControllers.js";
import { isLoggedIn, isVerified } from "../middlewares/middlewares.js";

router.route('/')
    .get(isLoggedIn, isVerified, getForm)
    .post(saveUrl);

router.route('/view/:_id')
    .get(isLoggedIn, renderUrl);

router.route('/:idx')
    .get(getUrl);



export default router;
