import Url from "../models/urlModel.js";
import { checkUrlExistence, formatUrl } from "../utils/utils.js";
import { nanoid } from "nanoid";


const getForm = (req, res) => {
    // console.log(req.user, req.session);
    const { user } = req;
    res.render('home', { user });
};

const saveUrl = async (req, res) => {
    const { destinationUrl } = req.body;
    const formattedUrl = formatUrl(destinationUrl);
    const realUrl = await checkUrlExistence(destinationUrl);
    if (realUrl) {
        const existingUrl = await Url.findOne({ originalUrl: formattedUrl });
        if (existingUrl || `${destinationUrl}`.toLowerCase().includes('dev_nano')) {
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
            let idx = nanoid(5);
            let shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
            let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());

            let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
            console.log(shortenedUrl, existingUrlArr, existingShortenedUrl);

            while (existingShortenedUrl) {
                idx = nanoid(5);
                shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
                existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());

                existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                console.log(shortenedUrl, existingUrlArr, existingShortenedUrl);

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

