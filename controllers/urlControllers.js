import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import { checkUrlExistence, formatUrl } from "../utils/utils.js";
import { nanoid } from "nanoid";


const getForm = (req, res) => {
    const { user } = req;
    res.render('home', { user });
};

const saveUrl = async (req, res) => {
    try {
        const author = req.user._id || await User.find({ email: 'segunfadipe97@gmail.com' });
        const { destinationUrl, customText } = req.body;
        const formattedUrl = formatUrl(destinationUrl);
        const realUrl = await checkUrlExistence(destinationUrl);

        if (realUrl) {
            const existingUrl = await Url.findOne({ originalUrl: formattedUrl });
            if (existingUrl || `${formattedUrl}`.toLowerCase().includes('dev_nano')) {
                console.log('object');
                if (existingUrl) {
                    const { _id } = existingUrl;
                    req.flash('info', 'Link already exists!');
                    res.redirect(`/dev_nano/view/${_id}`);
                } else {
                    const devUrl = await Url.findOne({ shortenedUrl: formattedUrl });
                    if (devUrl) {
                        req.flash('info', 'Link already exists!');
                        res.redirect(`/dev_nano/view/${devUrl._id}`);
                    } else {
                        req.flash('warning', 'Cannot shorten a short link!');
                        res.redirect(`/dev_nano`);
                    }
                }
            } else {

                let idx = nanoid(5);
                let shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
                if (!customText) {
                    let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                    let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                    while (existingShortenedUrl) {
                        shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
                        existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                        existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                    }
                } else {
                    shortenedUrl = `http://localhost:5000/dev_nano/${customText}/`;
                    let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                    let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                    while (existingShortenedUrl) {
                        let idx = nanoid(3);
                        shortenedUrl = `http://localhost:5000/dev_nano/${customText}${idx}/`;
                        existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                        existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                    }
                }


                const newUrl = author
                    ? new Url({ author, originalUrl: formattedUrl, shortenedUrl })
                    : new Url({ originalUrl: formattedUrl, shortenedUrl });

                try {
                    await newUrl.save();
                    const { _id } = newUrl;
                    req.flash('success', 'Short link created succesfully!');
                    res.redirect(`/dev_nano/view/${_id}`);
                } catch (error) {
                    req.flash('error', 'Internal server error!');
                    res.redirect(`/dev_nano`);
                }
            }
        } else {
            req.flash('error', 'Invalid link, Provide a valid Link!');
            res.redirect(`/dev_nano`);
        }
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano`);
    }
};

const renderUrl = async (req, res) => {
    try {
        const { _id } = req.params;
        const existingUrl = await Url.findOne({ _id });
        if (existingUrl) {
            res.render('url/show', { existingUrl });
        } else {
            req.flash('error', 'Link not found!');
            res.redirect(`/dev_nano`);
        }
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano`);
    }
};

const getUrl = async (req, res) => {
    try {
        const { idx } = req.params;
        const shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
        const existingUrl = await Url.findOne({ shortenedUrl });
        existingUrl
            ? res.redirect(301, `${existingUrl.originalUrl}`)
            : res.redirect('/dev_nano');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano`);
    }
};

const updateUrl = async (req, res) => {

};
const deleteUrl = async (req, res) => {
    try {
        const { idx } = req.params;
        await Url.findByIdAndDelete(idx, { new: true });
        console.log(idx);
        res.redirect('/user/dashboard');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano`);
    }
};

export { getForm, saveUrl, renderUrl, getUrl, updateUrl, deleteUrl };

