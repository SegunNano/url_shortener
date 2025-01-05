import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.MONGO_URI;
const secret = process.env.SECRET;
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Succesfully Connected to mongoDB :)');
    } catch (err) {
        console.error(`Error Message: ${err.message}`);
        process.exit(1);
    }
};
const store = MongoStore.create({
    mongoUrl: dbUrl,
    collectionName: 'sessions',
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

export { connectDB, sessionConfig };