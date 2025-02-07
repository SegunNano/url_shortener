import Url from "../models/urlModel.js";
import User from "../models/userModel.js";


const dashboard = async (req, res) => {
    const userUrls = await Url.find({ author: req.user._id });
    // console.log(userUrls);
    res.render('users/dashboard', { userUrls });
};

const editProfile = async (req, res) => {

};



export { dashboard };