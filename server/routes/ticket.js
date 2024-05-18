const { Router } = require("express");

const router = Router();

const ticketController = require("../controllers/ticket");
const middleware = require("../middlewares/auth");

router.post("/crear", middleware.auth, ticketController.crear);
router.put("/editar/:id", middleware.auth, ticketController.editar);
router.delete("/eliminar/:id", middleware.auth, ticketController.eliminar);

module.exports = router;