const chatController = require("../controllers/chat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/chat/all",chatController.findAll);

  app.post("/api/chat",(req,res) =>{
    chatController.create(req.body.message)
  })
  
};