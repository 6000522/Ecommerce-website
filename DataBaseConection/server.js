const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose'); // Added mongoose

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Rituraj"; // Add your local database name here

// log requests
app.use(morgan('tiny'));

// MongoDB connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to local MongoDB database");
}).catch(err => {
  console.log("Error connecting to MongoDB:", err.message);
});

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
