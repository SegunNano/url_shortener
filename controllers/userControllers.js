import User from "../models/userModel.js";

const renderRegister = (req, res) => {
    res.render('users/register');
};

const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        console.log(req.login);
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            // req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/dev_nano');
        });
    } catch (e) {
        console.log('error', e.message);
        res.redirect('/auth/register');
    }
};

const renderLogin = (req, res) => {
    res.render('users/login');
};

const login = (req, res) => {
    // req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/dev_nano';
    // delete req.session.returnTo;
    res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy();
        res.redirect('/dev_nano');
    });
    // req.logout();
    // req.flash('success', "Goodbye!");
};

export { register, renderRegister, renderLogin, login, logout };