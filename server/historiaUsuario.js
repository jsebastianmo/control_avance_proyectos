const { Router } = require("express");

const router = Router();

const userController = require("../controllers/user");
const middleware = require("../middlewares/auth");

router.post("/crear", middleware.auth, userController.profile);

module.exports = router;