import Url from "../models/urlModel.js";
import { generateIdx, checkUrlExistence, formatUrl } from "../utils/utils.js";


const getForm = (req, res) => {
    res.render('url/form');
};

const saveUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const formattedUrl = formatUrl(originalUrl);
    const realUrl = await checkUrlExistence(originalUrl);
    if (realUrl) {
        const existingUrl = await Url.findOne({ originalUrl: formatUrl });
        if (existingUrl || `${originalUrl}`.toLowerCase().includes('dev_nano')) {
            if (existingUrl) {
                const { _id } = existingUrl;
                res.redirect(`/dev_nano/view/${_id}`);
            } else {
                const devUrl = await Url.findOne({ shortenedUrl: formattedUrl });
                devUrl
                    ? res.redirect(`/dev_nano/view/${devUrl._id}`)
                    : res.redirect(`/dev_nano`);
            }
        } else {
            let idx = generateIdx();
            let shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
            let existingShortenedUrl = await Url.findOne({ shortenedUrl });
            while (existingShortenedUrl) {
                idx = generateIdx();
                shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
                existingShortenedUrl = await Url.findOne({ shortenedUrl });
            }
            const newUrl = new Url({ originalUrl: formattedUrl, shortenedUrl });
            try {
                await newUrl.save();
                const { _id } = newUrl;
                res.redirect(`/dev_nano/view/${_id}`);
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        res.redirect(`/dev_nano`);
    }
};

const renderUrl = async (req, res) => {
    const { _id } = req.params;
    const existingUrl = await Url.findOne({ _id });
    existingUrl
        ? res.render('url/show', { existingUrl })
        : res.redirect(`/dev_nano`);
};

const getUrl = async (req, res) => {
    const { idx } = req.params;
    const shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
    const existingUrl = await Url.findOne({ shortenedUrl });
    existingUrl
        ? res.redirect(301, `${existingUrl.originalUrl}`)
        : res.redirect('/dev_nano');
};

export { getForm, saveUrl, renderUrl, getUrl };

