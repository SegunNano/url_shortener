import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import { checkUrlExistence, formatUrl, urlSuffixer } from "../utils/utils.js";
import { nanoid } from "nanoid";


const getForm = (req, res) => {
    console.log(req.session);
    res.render('url/createUrl',);
};

const saveUrl = async (req, res) => {
    try {
        const { destinationUrl, customText } = req.body;
        const formattedUrl = formatUrl(destinationUrl);
        const realUrl = await checkUrlExistence(formattedUrl);

        if (!realUrl) {
            req.flash('error', 'Invalid link, Provide a valid Link!');
            return res.redirect(`/url/create`);
        }
        const existingUrl = await Url.findOne({ originalUrl: formattedUrl });
        if (existingUrl || `${formattedUrl}`.toLowerCase().includes('dev_nano' || 'create-url')) {
            if (existingUrl) {
                req.flash('info', 'Link already exists!');
                return res.redirect(`/url/view/${existingUrl._id}`);
            }
            const devUrl = await Url.findOne({ shortenedUrl: formattedUrl });
            if (devUrl) {
                req.flash('info', 'Link already exists!');
                return res.redirect(`/url/view/${devUrl._id}`);
            }
            req.flash('warning', 'Cannot shorten a short link!');
            return res.redirect(`/url/create`);
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
                return res.redirect(`/url/create`);
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
        res.redirect(`/url/view/${newUrl._id}`);
    } catch (error) {
        console.log(error);
        req.flash('error', 'Internal server error!');
        res.redirect(`/url/create`);
    }
};

const renderUrl = async (req, res) => {
    try {
        const existingUrl = await Url.findById(req.params.idx);
        if (existingUrl) {
            if (existingUrl.author) {
                console.log(existingUrl);
                const authorUrl = await Url.findById(req.params.idx).populate("author", "_id username");
                return res.render('url/show', { existingUrl: authorUrl });
            }
            return res.render('url/show', { existingUrl });
        }
        req.flash('error', 'Link not found!');
        res.redirect(`/url/create`);
    } catch (error) {
        console.log(error);
        req.flash('error', 'Internal server error!');
        res.redirect(`/url/create`);
    }
};

const getUrl = async (req, res) => {
    try {
        console.log('here', req.params.idx);
        const shortenedUrl = `${urlSuffixer(req)}${req.params.idx}/`;
        const existingUrl = await Url.findOne({ shortenedUrl });
        if (existingUrl) {
            existingUrl.openedCount += 1;
            await existingUrl.save();
            return res.redirect(301, `${existingUrl.originalUrl}`);
        }
        req.flash('error', 'Short Link not found, create link now!');
        res.redirect('/url/create');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/url/create`);
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
            res.redirect(`/url/view/${idx}`);
        } else {
            req.flash('error', 'Invalid link, Provide a valid Link!');
            res.redirect(`/url/view/${idx}`);
        }
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/url/view/${idx}`);
    }
};

const deleteUrl = async (req, res) => {
    try {
        const { idx } = req.params;
        await Url.findByIdAndDelete(idx, { new: true });
        res.redirect('/user/myurls');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/url/create`);
    }
};

export { getForm, saveUrl, renderUrl, getUrl, updateUrl, deleteUrl };

