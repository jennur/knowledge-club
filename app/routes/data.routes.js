const bookController = require("../controllers/book.controller");
const chapterController = require("../controllers/chapter.controller")
const highlightController = require("../controllers/highlight.controller")
const articleController = require("../controllers/article.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/books", (req, res) => {
    bookController.findAll(req)
      .then(books => {
        res.status(200).send(books);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/book", (req, res) => {
    bookController.findById(req.query.bookId)
      .then((book) => {
        res.status(200).send(book);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/books/delete", (req, res) => {
    bookController.delete(req.query.bookId)
      .then(() => {
        res.status(200).send({ message: "Successfully removed book"});
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/book/cover-image", (req, res) => {
    bookController.getCoverImage(req.query.bookId)
      .then((coverImage) => {
        res.status(200).send(coverImage);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/books/chapters", (req, res) => {
    chapterController.findAll(req.query.bookId)
      .then((chapters) => { 
        res.status(200).send(chapters);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  })

  app.get("/api/books/chapters/text", (req, res) => {
    const { bookId, chapterNum } = req.query;

    chapterController.findOne(bookId, chapterNum)
      .then((chapter) => { 
        res.status(200).send(chapter);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });  
  })

  app.get("/api/books/chapters/text/highlights", (req, res) => {
    const { bookId, chapterNum } = req.query;

    highlightController.findAll(bookId, chapterNum)
      .then((highlights) => {
        res.status(200).send(highlights);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  })

  app.post("/api/books/chapters/text/highlights", (req, res) => {
    highlightController.create(req.body)
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  })

  app.post("/api/books/chapters/text/highlights/article", async (req, res) => {
    const articleData = req.body.article;
    const highlightId = req.body.highlightId;

    try {
      const article = await articleController.create(articleData);
      const articleWithHighlight = await articleController.setHighlight(article.articleId, highlightId);
      res.status(200).send(articleWithHighlight);
    } 
    catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
};