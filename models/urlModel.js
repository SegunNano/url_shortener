import mongoose from "mongoose";
const { Schema, model } = mongoose;


const required = true;
const unique = true;
const urlSchema = Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required
    },

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

const Url = model('Url', urlSchema);

export default Url;