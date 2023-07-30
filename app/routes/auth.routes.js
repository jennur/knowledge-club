const config = require("../config/auth.config");
const { verifySignUp, authJwt } = require("../middleware");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ], (req, res) => {
    const { username, email, password, roles } = req.body;
    authController.signup(username, email, password, roles)
      .then((roles) => {
        res.status(200).send({ 
          message: `User was registered successfully with roles ${roles}` 
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
          errors: err.errors
        });
      })
  });
  
  app.post("/api/auth/signin", (req, res) => {
    const { username, password } = req.body;

    authController.signin(username, password)
      .then((response) => {
        const { accessTokenCookie, token, user, authorities } = response;
        res.cookie(accessTokenCookie, token, { httpOnly: true })
          .status(200)
          .send({
            userId: user.userId,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
      })
      .catch((err) => {
        console.log(">> Error signing in:", err);
        return res.status(401).send({ message: err.message });
      })
  });

  app.get("/api/auth/logout", (req, res) => {
    res.clearCookie(config.accessTokenCookie);
    res.status(200).send({ message: "User logged out" });
  });

  app.get("/api/auth/verify-access-token", [authJwt.verifyToken], async (req, res) => {
    try {
      const user = await userController.findById(req.userId);
      res.status(200).send({ 
        message: "User token was verified",
        accessToken: req.cookies[config.accessTokenCookie],
        user
      });
    }
    catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

  app.get("/api/auth/verify-admin-access", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    res.status(200).send({ 
      message: `User was verified with admin access ${req.userId}`
    });
  })

};
