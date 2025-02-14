import mongoose from "mongoose";
const { Schema, model } = mongoose;


const required = true;
const unique = true;
const urlSchema = Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    openedCount: {
        type: Number,
        default: 0,
        required,
    },


}, { timestamps: true });


const Url = model('Url', urlSchema);


export default Url;