const { Router } = require("express");

const router = Router();

const datosController = require("../controllers/datos");
const middleware = require("../middlewares/auth");

router.get("/lista/:idCompania", middleware.auth, datosController.lista);

module.exports = router;