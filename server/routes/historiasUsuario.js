const { Router } = require("express");

const router = Router();

const historiasUsuario = require("../controllers/historiasUsuario");
const middleware = require("../middlewares/auth");

router.post("/crear", middleware.auth, historiasUsuario.crear);
router.put("/editar/:id", middleware.auth, historiasUsuario.editar);

module.exports = router;