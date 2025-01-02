import Url from "../models/urlModel.js";


const charArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
const generateIdx = () => {
    const idx = charArr[Math.floor(Math.random() * charArr.length)];
    return idx;
};


const getForm = (req, res) => {
    res.render('form');
};

const saveUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
        const { _id } = existingUrl;
        res.redirect(`/dev_nano/view/${_id}`);
    } else {
        let firstIdx = generateIdx();
        let secondIdx = generateIdx();
        let thirdIdx = generateIdx();
        let shortenedUrl = `http://localhost:5000/dev_nano/${firstIdx}${secondIdx}${thirdIdx}`;
        let existingShortenedUrl = await Url.findOne({ shortenedUrl });

        while (existingShortenedUrl) {
            firstIdx = generateIdx();
            secondIdx = generateIdx();
            thirdIdx = generateIdx();
            shortenedUrl = `http://localhost:5000/dev_nano/${firstIdx}${secondIdx}${thirdIdx}`;
            existingShortenedUrl = await Url.findOne({ shortenedUrl });
        }

        const newUrl = new Url({ originalUrl, shortenedUrl });

        try {
            await newUrl.save();
            const { _id } = newUrl;
            res.redirect(`/dev_nano/view/${_id}`);
        } catch (error) {
            console.log(error);
        }
    }
};

const renderUrl = async (req, res) => {
    const { _id } = req.params;
    const existingUrl = await Url.findOne({ _id });
    res.render('show', { existingUrl });
};

const getUrl = async (req, res) => {
    const { id } = req.params;
    const shortenedUrl = `http://localhost:5000/dev_nano/${id}`;
    const existingUrl = await Url.findOne({ shortenedUrl });
    if (existingUrl) {
        res.redirect(301, `${existingUrl.originalUrl}`);
    } else {
        res.redirect('/dev_nano');
    }
};

export { getForm, saveUrl, renderUrl, getUrl };

