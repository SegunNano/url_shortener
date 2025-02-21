import express from "express";
const router = express.Router();
import { getForm, saveUrl, renderUrl } from "../controllers/urlControllers.js";
import { catchAsync } from "../utils/asyncHandlers.js";

router.route('/create')
    .get(getForm)
    .post(catchAsync(saveUrl));

router.route('/view/:idx')
    .get(renderUrl);


export default router;
