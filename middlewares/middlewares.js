import Url from "../models/urlModel.js";
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;

        // req.flash('error', 'You must be signed in first!');
        return res.redirect('/auth/login');
    }
    next();
};
const isVerified = (req, res, next) => {
    if (!req.user.isVerified) {

        !req.session.returnTo && (req.session.returnTo = req.originalUrl);
        // req.flash('error', 'You must be signed in first!');
        return res.redirect('auth/verify-email');
    }
    next();
};

const isAuthor = async (req, res, next) => {
    const { idx } = req.params;
    const url = await Url.findById(idx);
    if (!url.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/dev_nano/view/${idx}`);
    }
    next();
};

export { isLoggedIn, isVerified, isAuthor };