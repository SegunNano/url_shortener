import express from "express";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";

import urlRoutes from "./routes/urlRoutes.js";

const app = express();

dotenv.config();
const port = process.env.Port || 5000;


connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use("/dev_nano", urlRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));


