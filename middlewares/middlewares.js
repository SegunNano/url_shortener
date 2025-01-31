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

export { isLoggedIn, isVerified };