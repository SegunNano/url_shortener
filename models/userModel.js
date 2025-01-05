import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const schema = mongoose.Schema;
const required = true;
const unique = true;

const userSchema = schema(
    {
        email: {
            type: String,
            required,
            unique
        },
        linksLeft: {
            type: Number,
            required,
            default: 50
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