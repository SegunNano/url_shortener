import User from "../models/userModel.js";
import Mail from "../utils/nodemailer.js";
import { generateIdx } from "../utils/utils.js";


const renderRegister = (req, res) => {
    res.render('users/auth', { route: 'register' });
};
const renderLogin = (req, res) => {
    res.render('users/auth', { route: 'login' });
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
            res.redirect('/auth/verify-email');
        });
    } catch (e) {
        console.log('error', e.message);
        res.redirect('/auth/register');
    }
};


const login = (req, res) => {
    // req.flash('success', 'welcome back!');
    console.log(req.session.returnTo);

    res.redirect('/auth/verify-email');
};

const renderVerify = async (req, res) => {
    console.log(req.user);
    if (!req.user.isVerified) {
        const email = req.user.email;
        const user = await User.findOne({ email });
        if (!user) return res.render('users/register');
        if ((user.verifyEmailTokenExpiration - Date.now() < 1000) || !user.verifyEmailTokenExpiration) {
            user.verifyEmailToken = generateIdx().toUpperCase();
            // user.verifyEmailTokenExpiration = Date.now() + 10 * 1000;
            user.verifyEmailTokenExpiration = Date.now() + 30 * 60 * 1000;
            req.session.emailSent = false;
        }
        const updatedUser = await user.save();
        if (!req.session.emailSent) {
            const mail = new Mail();
            mail.setTo(email);
            mail.setSubject("Let's Verify Your Email");
            mail.setText(`Your Email verification token is ${user.verifyEmailToken}`);
            mail.send();
            req.session.emailSent = true;
        }
        return res.render('users/verify', { user: updatedUser });
    }

    const redirectUrl = req.session.returnTo || '/dev_nano';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

const verify = async (req, res) => {
    const { token1, token2, token3, token4, token5, } = req.body;
    const token = token1 + token2 + token3 + token4 + token5;
    console.log(token);
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) return res.render('users/register');
    console.log(('here'));
    if (token === user.verifyEmailToken) {
        console.log(true);
        user.isVerified = true;
        user.verifyEmailToken = undefined;
        user.verifyEmailTokenExpiration = undefined;
        req.session.emailSent = undefined;
        const updatedUser = await user.save();
        console.log(updatedUser);
        res.redirect('/dev_nano');
    } else {
        console.log(false);
        res.redirect('/auth/verify-email');
    }
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

export { register, renderRegister, renderLogin, login, logout, verify, renderVerify };