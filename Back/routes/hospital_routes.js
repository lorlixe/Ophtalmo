const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');


const HospitalCtrl = require("../controllers/hospital_controller.js");

router.get('/', auth,HospitalCtrl.getHospital);
router.get("/:id", auth, HospitalCtrl.findHospital)
router.post('/', auth, HospitalCtrl.setHospital);
router.put("/:id", auth, HospitalCtrl.editHospital)
router.delete("/:id", auth, HospitalCtrl.deleteHospital)


module.exports = router;
