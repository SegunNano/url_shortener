import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import { checkUrlExistence, formatUrl, urlSuffixer } from "../utils/utils.js";
import { nanoid } from "nanoid";


const getForm = (req, res) => {
    const { user } = req;
    res.render('url/createUrl', { user });
};

const saveUrl = async (req, res) => {
    try {
        const { destinationUrl, customText } = req.body;
        const formattedUrl = formatUrl(destinationUrl);
        const realUrl = await checkUrlExistence(formattedUrl);

        if (!realUrl) {
            req.flash('error', 'Invalid link, Provide a valid Link!');
            return res.redirect(`/create-url`);
        }
        const existingUrl = await Url.findOne({ originalUrl: formattedUrl });
        if (existingUrl || `${formattedUrl}`.toLowerCase().includes('dev_nano' || 'create-url')) {
            if (existingUrl) {
                req.flash('info', 'Link already exists!');
                return res.redirect(`/view-url/${existingUrl._id}`);
            }
            const devUrl = await Url.findOne({ shortenedUrl: formattedUrl });
            if (devUrl) {
                req.flash('info', 'Link already exists!');
                return res.redirect(`/view-url/${devUrl._id}`);
            }
            req.flash('warning', 'Cannot shorten a short link!');
            return res.redirect(`/create-url`);
        }
        let shortenedUrl;
        if (!customText) {
            let idx = nanoid(5);
            shortenedUrl = `${urlSuffixer(req)}${idx}/`;
            let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
            let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
            while (existingShortenedUrl) {
                shortenedUrl = `${urlSuffixer(req)}${idx}/`;
                existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
            }
        } else {
            const user = await User.findById(req.user._id);
            if (!user || !user.linksLeft) {
                req.flash('warning', 'You used up your custom links, try again later.');
                return res.redirect(`/create-url`);
            }
            shortenedUrl = `${urlSuffixer(req)}${customText.replace(/\s+/g, '')
                }/`;
            let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
            let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
            while (existingShortenedUrl) {
                let idx = nanoid(3);
                shortenedUrl = `${urlSuffixer(req)}${customText.replace(/\s+/g, '')
                    }${idx}/`;
                existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
            }
            user.linksLeft -= 1;
            await user.save();
        }
        const newUrl = req.user
            ? new Url({ author: req.user._id, originalUrl: formattedUrl, shortenedUrl })
            : new Url({ originalUrl: formattedUrl, shortenedUrl });
        await newUrl.save();
        req.flash('success', 'Link shortened succesfully!');
        res.redirect(`/view-url/${newUrl._id}`);
    } catch (error) {
        console.log(error);
        req.flash('error', 'Internal server error!');
        res.redirect(`/create-url`);
    }
};

const renderUrl = async (req, res) => {
    try {
        const existingUrl = await Url.findById(req.params.idx);
        if (existingUrl) {
            if (existingUrl.author) {
                const authorUrl = await Url.findById(req.params.idx).populate("author", "id username");
                return res.render('url/show', { existingUrl: authorUrl });
            }
            res.render('url/show', { existingUrl });
        } else {
            req.flash('error', 'Link not found!');
            res.redirect(`/create-url`);
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Internal server error!');
        res.redirect(`/create-url`);
    }
};

const getUrl = async (req, res) => {
    try {
        const shortenedUrl = `${urlSuffixer(req)}${req.params.idx}/`;
        const existingUrl = await Url.findOne({ shortenedUrl });
        if (existingUrl) {
            existingUrl.openedCount += 1;
            await existingUrl.save();
            return res.redirect(301, `${existingUrl.originalUrl}`);
        }
        req.flash('error', 'Short Link not found, create link now!');
        res.redirect('/create-url');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/create-url`);
    }
};

const updateUrl = async (req, res) => {
    try {
        const { idx } = req.params;
        const { destinationUrl } = req.body;
        const formattedUrl = formatUrl(destinationUrl);
        const realUrl = await checkUrlExistence(formattedUrl);
        if (realUrl) {
            await Url.findByIdAndUpdate(idx, { originalUrl: formattedUrl }, { new: true });
            req.flash('success', 'Link updated succesfully!');
            res.redirect(`/view-url/${idx}`);
        } else {
            req.flash('error', 'Invalid link, Provide a valid Link!');
            res.redirect(`/view-url/${idx}`);
        }
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/view-url/${idx}`);
    }
};

const deleteUrl = async (req, res) => {
    try {
        const { idx } = req.params;
        await Url.findByIdAndDelete(idx, { new: true });
        res.redirect('/user/myurls');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/create-url`);
    }
};

export { getForm, saveUrl, renderUrl, getUrl, updateUrl, deleteUrl };

