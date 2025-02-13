import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import { checkUrlExistence, formatUrl } from "../utils/utils.js";
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

        if (realUrl) {
            const existingUrl = await Url.findOne({ originalUrl: formattedUrl });
            if (existingUrl || `${formattedUrl}`.toLowerCase().includes('dev_nano')) {
                if (existingUrl) {
                    req.flash('info', 'Link already exists!');
                    res.redirect(`/dev_nano/view/${existingUrl._id}`);
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
                if (!customText) {
                    let idx = nanoid(5);
                    let shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
                    let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                    let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                    while (existingShortenedUrl) {
                        shortenedUrl = `http://localhost:5000/dev_nano/${idx}/`;
                        existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                        existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                    }
                } else {
                    const user = await User.findById(req.user._id);
                    if (user && user.linksLeft) {
                        let shortenedUrl = `http://localhost:5000/dev_nano/${customText.replace(/\s+/g, '')
                            }/`;
                        let existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                        let existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                        while (existingShortenedUrl) {
                            let idx = nanoid(3);
                            shortenedUrl = `http://localhost:5000/dev_nano/${customText.replace(/\s+/g, '')
                                }${idx}/`;
                            existingUrlArr = (await Url.find()).map(x => x.shortenedUrl.toUpperCase());
                            existingShortenedUrl = existingUrlArr.includes(shortenedUrl.toUpperCase());
                        }
                        user.linksLeft -= 1;
                        await user.save();
                    } else {
                        req.flash('warning', 'You used up your custom links, try again later.');
                        res.redirect(`/dev_nano`);
                    }
                }
                const newUrl = req.user
                    ? new Url({ author: req.user._id, originalUrl: formattedUrl, shortenedUrl })
                    : new Url({ originalUrl: formattedUrl, shortenedUrl });

                await newUrl.save();
                const { _id } = newUrl;
                req.flash('success', 'Link shortened succesfully!');
                res.redirect(`/dev_nano/view/${_id}`);
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
        const existingUrl = await Url.findById(req.params.idx);
        if (existingUrl) {
            if (existingUrl.author) {
                const authorUrl = await Url.findOne({ _id }).populate("author", "id username");
                return res.render('url/show', { existingUrl: authorUrl });
            }
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
        const shortenedUrl = `http://localhost:5000/dev_nano/${req.params.idx}/`;
        const existingUrl = await Url.findOne({ shortenedUrl });
        if (existingUrl) {
            existingUrl.openedCount += 1;
            await existingUrl.save();
            return res.redirect(301, `${existingUrl.originalUrl}`);
        }
        req.flash('error', 'Short Link not found, create link now!');
        res.redirect('/dev_nano');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano`);
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
            res.redirect(`/dev_nano/view/${idx}`);
        } else {
            req.flash('error', 'Invalid link, Provide a valid Link!');
            res.redirect(`/dev_nano/view/${idx}`);
        }
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano/view/${idx}`);
    }
};

const deleteUrl = async (req, res) => {
    try {
        const { idx } = req.params;
        await Url.findByIdAndDelete(idx, { new: true });
        res.redirect('/user/myurls');
    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect(`/dev_nano`);
    }
};

export { getForm, saveUrl, renderUrl, getUrl, updateUrl, deleteUrl };

