
const express = require("express");
const session = require('express-session');
const path = __dirname + '/app/views/dist/';
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const faker = require("faker");

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
require('./app/routes/data.routes')(app);
require('./app/routes/chat.routes')(app);



// controllers
const bookController = require("./app/controllers/book.controller");
// const videoController = require("./app/controllers/video.controller");
// const articleController = require("./app/controllers/article.controller");
// const userController = require("./app/controllers/user.controller");
const roleController = require("./app/controllers/role.controller");
const chapterController = require("./app/controllers/chapter.controller");
const chatController = require("./app/controllers/chat.controller");
const highlightController = require("./app/controllers/highlight.controller")


// DEVELOPMENT MODE

//For generating fake data
var fake_books = [...Array(10)].map((user) => (
  {
    title:faker.commerce.productName(),
    dateUploaded: new Date(),
    published: true,
    FileType:".epub",
    NumChapters:faker.mersenne.rand(20,5)
  }

));
var chapters = Array();
book_number = 0;
for(book of fake_books){
  for(chapter_num of Array(book.NumChapters).keys()){
    chapters.push({
      bookUUID:book_number,
      chapterName: faker.name.firstName(),
      chapterNumber:chapter_num,
      dateUploaded: new Date(),
      chapterContent: faker.lorem.paragraphs(5)
    })
   
  }
  book_number++;
}
const initDb = async () => {
  roleController.create({ id: 1, name: "user" })
  roleController.create({ id: 2, name: "moderator" })
  roleController.create({ id: 3, name: "admin" })
  for(book of fake_books){
    bookController.create(book);
  }
  for(chapter of chapters){
    chapterController.create(chapter);
  }
  highlightController.create({
    bookId:0,
    chapterNum:0,
    startloc:0,
    endloc:10,
    timeSent:Date(),
    fromUser:"Steve",
    content:"hello"
  })
};
// database
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initDb();
});

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