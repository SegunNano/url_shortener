import express from "express";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
import ejsMate from "ejs-mate";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import User from "./models/userModel.js";


import { connectDB, sessionConfig } from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();


const app = express();

const port = process.env.Port || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

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


