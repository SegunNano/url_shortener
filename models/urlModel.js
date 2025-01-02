import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortenedUrl: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

export default Url;