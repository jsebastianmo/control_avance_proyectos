const { Router } = require("express");

const router = Router();

const compania = require("../controllers/compania");
const middleware = require("../middlewares/auth");

router.get("/companias", compania.companias);
router.post("/crear", middleware.auth, compania.crear);

module.exports = router;