import axios from "axios";
import crypto from "crypto";
import Mail from "../utils/nodemailer.js";
import { Idx, addPrefix } from "./constants.js";
import { resetPassword } from "./email-html.js";



const formatUrl = (url) => {
    let prefixedUrl = addPrefix(url);
    return (prefixedUrl.endsWith('/'))
        ? prefixedUrl
        : prefixedUrl + '/';
};


const checkUrlExistence = async (url) => {
    try {
        const response = await axios.head(formatUrl(url), {
            headers: { 'User-Agent': 'Mozilla/5.0' } // Mimic a browser
        });
        return response.status >= 200 && response.status < 300; // Return true if 2xx
    } catch (error) {
        console.log('Error:', error.response?.status || error.message);
        return false; // Return false for errors
    }
};


const generateIdx = () => {
    const firstIdx = Idx();
    const secondIdx = Idx();
    const thirdIdx = Idx();
    const fourthIdx = Idx();
    const fifthIdx = Idx();

    return `${firstIdx}${secondIdx}${thirdIdx}${fourthIdx}${fifthIdx}`;
};

const resetPasswordError = (err, user) => {
    console.error(err);
    req.flash('error', 'Failed to reset password. Please try again.');
    return res.redirect(`/auth/reset-password/${user.resetPasswordToken}`);
};


const resetPasswordFunc = async (user, req, res) => {
    if ((user.resetPasswordTokenExpiration - Date.now() < 1000) || !user.resetPasswordTokenExpiration) {
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordTokenExpiration = Date.now() + 30 * 60 * 1000;
    }
    const updatedUser = await user.save();
    const mail = new Mail();
    mail.setTo(updatedUser.email);
    mail.setSubject("Let's Verify Your Email");
    mail.setHTML(resetPassword(updatedUser));
    mail.setText(`Click the link to reset your password. http://localhost:5000/auth/reset-password/${updatedUser.resetPasswordToken}`);
    mail.send();
    req.flash('info', 'Verification email has been sent to you!');
    res.redirect('/dev_nano');
};





export { generateIdx, checkUrlExistence, formatUrl, resetPasswordError, resetPasswordFunc };