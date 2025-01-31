import mongoose from "mongoose";

const required = true;
const unique = true;
const urlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required,
        unique
    },
    shortenedUrl: {
        type: String,
        required,
        unique
    },

}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

export default Url;