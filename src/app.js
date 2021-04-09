require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const route = require('./routes')
const {checkUser} =  require('./app/middlewares/authMiddleware')


const db = require('./config/db')
db.connect();


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(checkUser)
route(app)

const port = process.env.PORT;
app.listen(port)