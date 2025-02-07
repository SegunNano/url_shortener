import Url from "../models/urlModel.js";
import User from "../models/userModel.js";


const myurls = async (req, res) => {
    const userUrls = await Url.find({ author: req.user._id });
    // console.log(userUrls);
    res.render('users/myurls', { userUrls });
};

const editProfile = async (req, res) => {

};



export { myurls };