import User from "../models/userModel.js";
import Mail from "../utils/nodemailer.js";
import { generateIdx, resetPasswordError, resetPasswordFunc } from "../utils/utils.js";
import { generateVerificationEmail } from "../utils/email-html.js";


const renderRegister = (req, res) => {
    res.render('auth/auth', { route: 'register' });
};
const renderLogin = (req, res) => {
    res.render('auth/auth', { route: 'login' });
};

const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('info', 'Verify your email to complete registration!');
            return res.redirect('/auth/verify-email');
        });
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/register');
    }
};


const login = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiration = undefined;
        await user.save();
        res.redirect('/auth/verify-email');
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/login');
    }
};

const renderVerify = async (req, res) => {
    try {
        if (!req.user.isVerified) {
            const email = req.user.email;
            const user = await User.findOne({ email });
            if (!user) {
                req.flash('info', 'Email not yet registered');
                return res.redirect('/auth/register');
            }
            if ((user.verifyEmailTokenExpiration - Date.now() < 1000) || !user.verifyEmailTokenExpiration) {
                user.verifyEmailToken = generateIdx().toUpperCase();
                user.verifyEmailTokenExpiration = Date.now() + 30 * 60 * 1000;
                req.session.verifyEmailSent = false;
            }
            const updatedUser = await user.save();
            req.user = updatedUser;

            if (!req.session.verifyEmailSent) {
                const mail = new Mail();
                mail.setTo(email);
                mail.setSubject("Let's Verify Your Email");
                mail.setHTML(generateVerificationEmail(updatedUser));
                mail.setText(`Your Email verification token is ${user.verifyEmailToken}`);
                req.session.verifyEmailSent = await mail.send();
            }
            console.log(req.user, req.session.verifyEmailSent);
            return res.render('auth/verify');
        }
        req.flash('success', `Welcome back, ${req.user.username}!`);
        const redirectUrl = req.session.returnTo || '/dev_nano';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/dev_nano');
    }
};

const verify = async (req, res) => {
    try {
        const { token1, token2, token3, token4, token5, } = req.body;
        const token = token1 + token2 + token3 + token4 + token5;
        console.log(token);
        const email = req.user.email;
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'User not found!');
            res.redirect('/auth/register');
        };
        if (token === user.verifyEmailToken) {
            user.isVerified = true;
            user.verifyEmailToken = undefined;
            user.verifyEmailTokenExpiration = undefined;
            req.session.verifyEmailSent = undefined;
            const updatedUser = await user.save();
            console.log(updatedUser);
            req.flash('success', `Welcome, ${updatedUser.username}!`);
            res.redirect('/dev_nano');
        } else {
            req.flash('warning', 'Token not valid, please enter a valid one!');
            res.redirect('/auth/verify-email');
        }
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/verify-email');
    }
};

const logout = (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) return next(err);
            req.session.regenerate(err => {
                if (err) return next(err);
            });
            req.flash('success', `You've successfully logged out!`);
            res.redirect('/dev_nano');
        });
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/login');
    }
};

const changePassword = async (req, res) => {
    try {
        const user = await User.findOne(req.user);
        if (user) {
            resetPasswordFunc(user, req, res);
        } else {
            req.flash('warning', `You have to be logged in first!`);
            res.redirect('/user/myurls');
        }
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/reset-password');
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            resetPasswordFunc(user, req, res);
        } else {
            req.flash('warning', `User not found!`);
            res.redirect('/login');
        }
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/login');
    }
};
const resetPasswordForm = async (req, res) => {
    try {
        const { resetPasswordToken } = req.params;
        const user = await User.findOne({ resetPasswordToken });
        if (user) {
            if ((user.resetPasswordTokenExpiration - Date.now() < 1000) || !user.resetPasswordTokenExpiration) resetPasswordFunc(user, req, res);
            else res.render('auth/changePassword', { user });
        } else {
            req.flash('warning', 'User not found! Try again.');
            res.redirect('/auth/login');
        }
    } catch (e) {
        req.flash('error', 'Internal server error, Please try again!');
        return res.redirect('/auth/login');
    }
};
const resetPassword = async (req, res, next) => {
    const { resetPasswordToken } = req.params;
    const passwordObj = req.body;
    const { oldPassword, newPassword } = passwordObj;
    try {
        const user = await User.findOne({ resetPasswordToken });
        if (user) {
            if (req.user) {
                await user.changePassword(oldPassword, newPassword, async (err) => {
                    if (err) {
                        resetPasswordError(err);
                    };
                    user.resetPasswordToken = undefined;
                    user.resetPasswordTokenExpiration = undefined;
                    await user.save();
                    req.logout((err) => {
                        if (err) return next(err);
                        req.session.regenerate(err => {
                            if (err) return next(err);
                        });
                        req.flash('success', 'Password has been reset! You can now log in.');
                        res.redirect('/auth/login');
                    });
                });
            } else {
                await user.setPassword(newPassword, async (err) => {
                    if (err) {
                        resetPasswordError(err);
                    };
                    user.resetPasswordToken = undefined;
                    user.resetPasswordTokenExpiration = undefined;
                    await user.save();
                    req.flash('success', 'Password has been reset! You can now log in.');
                    res.redirect('/auth/login');
                });
            }


        } else {
            req.flash('error', 'User not found!');
            if (req.user) {
                res.redirect('/auth/reset-password');
            } else {
                res.redirect('/auth/login');
            }
        }

    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error!');
        req.user
            ? res.redirect('/auth/reset-password')
            : res.redirect('/auth/login');
    }
};



export { register, renderRegister, renderLogin, login, logout, verify, renderVerify, changePassword, forgotPassword, resetPassword, resetPasswordForm };