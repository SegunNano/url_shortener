import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const schema = mongoose.Schema;
const required = true;
const unique = true;

const userSchema = new schema(
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
            default: 50
        },
        verifyEmailToken: {
            type: String,
        },
        verifyEmailTokenExpiration: {
            type: Date,
        },
        linksUsed: {
            type: Number,
            required,
            default: 0
        }
    }, { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;