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

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  
  app.post("/api/auth/signin", authController.signin);
  app.get("/api/auth/logout", authController.logout);

  app.get("/api/auth/verify-access-token", [authJwt.verifyToken], async (req, res) => {
    try {
      const user = await userController.findById(req.userId);
      res.status(200).send({ 
        message: "User token was verified",
        accessToken: req.cookies["kc_access_token"],
        user
      });
    }
    catch (err) {
      res.status(500).send({ message: err.message });
    }

  })

  app.get("/api/auth/verify-admin-access", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    res.status(200).send({ 
      message: `User was verified with admin access ${req.userId}`
    });
  })
};
