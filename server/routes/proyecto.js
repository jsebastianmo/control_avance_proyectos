const { Router } = require("express");

const router = Router();

const proyecto = require("../controllers/proyecto");
const middleware = require("../middlewares/auth");

router.post("/crear", middleware.auth, proyecto.crear);
router.get("/proyectos/:idCompania", middleware.auth, proyecto.proyectos);

module.exports = router;