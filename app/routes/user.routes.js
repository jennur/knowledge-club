const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user", [authJwt.verifyToken], (req, res) => {
    userController.findById(req.userId)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      })
  });

  app.post("/api/user/update/username", [authJwt.verifyToken], (req, res) => {
    const { newUsername, userId } = req.body;
    userController.updateUsername(newUsername, userId)
      .then(() => {
        return res.status(200).send({
          message: "Your username was successfully updated!"
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      })
  });

  app.post("/api/user/update/biography", [authJwt.verifyToken], (req, res) => {
    const { newBiography, userId } = req.body;
    userController.updateBiography(newBiography, userId)
      .then(() => {
        return res.status(200).send({ 
          message: "Your biography was successfully updated!"
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      })
  });

  // Tests
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    userController.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};