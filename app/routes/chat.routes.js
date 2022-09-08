const chatController = require("../controllers/chat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/chat/all", (req,res) => {
    chatController.findByRoomId(req.query.roomId)
      .then((messages) => {
        res.status(200).send(messages);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/chat",(req,res) =>{
    chatController.create(req.body.message)
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
  
};