const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")
const gadget = require("../controllers/gadgetsController")

router.get("/", auth, gadget.getGadgets)
router.post("/", auth, gadget.addGadget)
router.patch("/:id", auth, gadget.updateGadget)
router.delete("/:id", auth, gadget.decommisionGadget)
router.post("/:id/self-destruct", auth, gadget.selfDestruct)

module.exports = router