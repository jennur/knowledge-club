const express = require("express");
const path = __dirname + '/app/views/dist/';
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");

// views
app.use(express.static(path));

//cors
var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// controllers
const bookController = require("./app/controllers/book.controller");
const videoController = require("./app/controllers/video.controller");
const articleController = require("./app/controllers/article.controller");

const run = async () => {
  const book1 = await bookController.create({
    title: "Lorem Ipsum",
    description: "My first book"
  })
  const book2 = await bookController.create({
    title: "Dolor Sit Amet",
    description: "My second book"
  })

  const video1 = await videoController.create(book1.id, {
    title: "My video 1",
    description: "My first video"
  })
  const video2 = await videoController.create(book1.id, {
    title: "My video 2",
    description: "My second video"
  })

  const article1 = await articleController.create(book1.id, {
    title: "My article 1",
    description: "My first article"
  })
  const article2 = await articleController.create(book1.id, {
    title: "My article 2",
    description: "My second article"
  })

  const book1Data = await bookController.findById(book1.id);

  console.log("\n\nMy book:", JSON.stringify(book1Data));
};
// database
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});