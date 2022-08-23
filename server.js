
const express = require("express");
const session = require('express-session');
const path = __dirname + '/app/views/dist/';

const cors = require("cors");
const app = express();
const db = require("./app/models");

const history = require('connect-history-api-fallback');
const cookieParser = require("cookie-parser");

app.use(history());
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// views
app.use(express.static(path));

//cors
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// controllers
const bookController = require("./app/controllers/book.controller");
const videoController = require("./app/controllers/video.controller");
const articleController = require("./app/controllers/article.controller");
const userController = require("./app/controllers/user.controller");
const roleController = require("./app/controllers/role.controller");

// const initDb = async () => {
//   roleController.create({ id: 1, name: "user" })
//   roleController.create({ id: 2, name: "moderator" })
//   roleController.create({ id: 3, name: "admin" })
// };

// // database
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initDb();
// });

// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
