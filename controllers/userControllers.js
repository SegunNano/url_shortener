import Url from "../models/urlModel.js";
import User from "../models/userModel.js";


const myurls = async (req, res) => {
    const userUrls = await Url.find({ author: req.user._id });
    // (userUrls);
    res.render('users/myurls', { userUrls });
};

const updateProfile = async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.user._id;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash('error', 'Username already exist!');
            return res.redirect('/dev_nano');
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true });

        if (!updatedUser) {
            req.flash('error', 'User not found, please login and try again!');
            return res.redirect('/auth/login');
        }
        req.flash('suceess', 'Username updated sucessfully, login now with new username!');
        res.redirect('/auth/login');

    } catch (error) {
        req.flash('error', 'Internal server error!');
        res.redirect('/dev_nano');
    }

};



export { myurls, updateProfile };