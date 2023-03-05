const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express()
const Routes = require('./routes/index.route');
// const cors= require('cors')
const dbURL = 'mongodb+srv://maruf:maruf@cluster0.l2ygl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURL
    , { useNewUrlParser: true }).then(() =>
        console.log("DB connect succesfully"))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors())

app.use(Routes)

const port = 4000;
app.listen(port, () => {
    console.log(`App Started ${port}`)
})