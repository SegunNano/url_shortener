import express from "express";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
import ejsMate from "ejs-mate";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

process.env.NODE_ENV !== "production" && dotenv.config();


import connectDB from "./config/db.js";
import sessionConfig from "./config/session.js";

import User from "./models/userModel.js";

import urlRoutes from "./routes/urlRoutes.js";
import userRoutes from "./routes/userRoutes.js";


connectDB();
const app = express();

const port = process.env.Port || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// console.log(__dirname);
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.isAuthenticated()
//     next()
// })

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
});


app.use("/dev_nano", urlRoutes);
app.use("/auth", userRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));


