import Url from "../models/urlModel.js";
import User from "../models/userModel.js";


const dashboard = async (req, res) => {
    const { _id } = req.user;
    const user = _id;
    const userUrls = await Url.find({ user });

    console.log(userUrls);
    res.send('hi');
};

export { dashboard };