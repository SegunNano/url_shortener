import express from "express";
const router = express.Router();
import { getForm, saveUrl, renderUrl, getUrl } from "../controllers/urlControllers.js";

router.route('/')
    .get(getForm)
    .post(saveUrl);

router.route('/view/:_id')
    .get(renderUrl);

router.route('/:idx')
    .get(getUrl);



export default router;
