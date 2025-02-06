import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema, model } = mongoose;
const required = true;
const unique = true;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required,
            unique
        },
        isVerified: {
            type: Boolean,
            required,
            default: false
        },
        linksLeft: {
            type: Number,
            required,
            default: 3
        },
        verifyEmailToken: { type: String, },
        verifyEmailTokenExpiration: { type: Date, },
        resetPasswordToken: { type: String },
        resetPasswordTokenExpiration: { type: Date, },
        linksUsed: {
            type: Number,
            required,
            default: 0
        }
    }, { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

export default User;