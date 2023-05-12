const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const SlotCtrl = require("../controllers/slot_controller.js");


router.get('/', auth,SlotCtrl.getSolt);
router.get("/:id", auth, SlotCtrl.findSolt)
router.post('/', auth, SlotCtrl.setSolt);
// router.put("/:id", auth, SlotCtrl.editSolt)
router.delete("/:id", auth, SlotCtrl.deleteSolt)


module.exports = router;
