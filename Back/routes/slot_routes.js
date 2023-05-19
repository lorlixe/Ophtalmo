const express = require("express");
const router = express.Router();
const {authentification, authorization} = require('../middleware/auth')

const SlotCtrl = require("../controllers/slot_controller.js");


router.get('/', authentification, SlotCtrl.getSolt);
router.get("/:id", authentification, SlotCtrl.findSolt)
router.post('/', authentification, authorization, SlotCtrl.setSolt);
router.put("/:id", authentification, authorization, SlotCtrl.editSolt)
router.delete("/:id", authentification, authorization, SlotCtrl.deleteSolt)


module.exports = router;
