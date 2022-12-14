require('dotenv').config({ path: "./.env"})
const express = require("express");
const session = require('express-session');
const path = __dirname + '/app/views/dist/';
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors:{
        origin:"http://localhost:5173"
    }
});
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

var allowList = [
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:8080",
  "https://knowledge-club.herokuapp.com",
  "https://knowledge-club-staging.herokuapp.com",
  "http://yedia.io",
  "https://yedia.io",
  "http://www.yedia.io",
  "https://www.yedia.io"
]

//cors
var corsOptions =  {
  credentials: true
};
var corsOptionsDelegate = function (req, callback) {
    if(allowList.indexOf(req.header("Origin")) > -1){
      corsOptions = {
        ...corsOptions,
        origin: true 
      };
    }
    else {
      corsOptions = { 
        ...corsOptions,
        origin: false 
      }
    }
    callback(null, corsOptions);
};


app.use(cors(corsOptionsDelegate));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/data.routes')(app);
require('./app/routes/chat.routes')(app);

// controllers
const userController = require("./app/controllers/user.controller");
const roleController = require("./app/controllers/role.controller");

// DEVELOPMENT MODE

const initDb = async () => {
  const userRole = await roleController.create({ id: 1, name: "user" })
  const moderatorRole = await roleController.create({ id: 2, name: "moderator" })
  const adminRole = await roleController.create({ id: 3, name: "admin" })
  const adminUser = await userController.create({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    email: process.env.ADMIN_EMAIL
  })

  userController.setRole(adminUser.id, adminRole.id);
};
//database
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initDb();
// });

//END OF DEVELOPMENT MODE


// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./socket-server")(io);