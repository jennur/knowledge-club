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
    const { username, userId } = req.body;
    userController.updateUsername(username, userId)
      .then((username) => {
        return res.status(200).send(username);
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      })
  });

  app.post("/api/user/update/email", [authJwt.verifyToken], (req, res) => {
    const { email, userId } = req.body;
    userController.updateEmail(email, userId)
      .then((email) => {
        return res.status(200).send(email);
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      })
  });

  app.post("/api/user/update/biography", [authJwt.verifyToken], (req, res) => {
    const { biography, userId } = req.body;
    userController.updateBiography(biography, userId)
      .then((biography) => {
        return res.status(200).send(biography);
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      })
  });

  app.post("/api/user/update/favorite-categories", [authJwt.verifyToken], (req, res) => {
    const { favoriteCategories, userId } = req.body;
    userController.updateFavoriteCategories(favoriteCategories, userId)
      .then((favoriteCategories) => {
        return res.status(200).send(favoriteCategories);
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