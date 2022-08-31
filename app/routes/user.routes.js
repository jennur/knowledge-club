const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/user", [authJwt.verifyToken], (req, res) => {
    controller.findById(req.query.userId)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      })
  }
  );

  app.post("/api/user/update/username",
    [authJwt.verifyToken],
    controller.updateUsername
  );

  app.post("/api/user/update/biography", 
    [authJwt.verifyToken],
    controller.updateBiography
  );

  // Tests
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};