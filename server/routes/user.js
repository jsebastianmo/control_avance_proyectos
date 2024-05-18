const { Router } = require("express");

const router = Router();

const userController = require("../controllers/user");
const middleware = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", middleware.auth, userController.users);
router.get("/user/:idCompania", middleware.auth, userController.user);

module.exports = router;