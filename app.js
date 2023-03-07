import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import Routes from './routes/index.js';
import {config} from 'dotenv'
import cookieParser from "cookie-parser";
const app = express()
config()
const dbURL = 'mongodb+srv://maruf:maruf@cluster0.l2ygl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURL
    , { useNewUrlParser: true }).then(() =>
        console.log("DB connect succesfully"))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors())
app.use(cookieParser())
app.use(Routes)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App Started ${port}`)
})