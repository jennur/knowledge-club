const bookController = require("../controllers/book.controller");
const chapterController = require("../controllers/chapter.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/books", bookController.findAll);

  app.get("/api/books/chapters", (req, res) => {
    chapterController.findAll(req.query.bookId).then((chapters) => { 
      res.send(chapters);
    })    
  })

  app.get("/api/books/chapters/text",(req,res)=>{
    console.log(req.query)
    chapterController.findOne(req.query.bookId,req.query.chapterNum).then((chapter)=>{ 
      res.send(chapter);
    })    
  })
  
};