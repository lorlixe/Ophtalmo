const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const {authentification, authorization} = require('../middleware/auth')


const HospitalCtrl = require("../controllers/hospital_controller.js");

router.get('/', authentification,authorization, HospitalCtrl.getHospital);
router.get("/:id", authentification, authorization, HospitalCtrl.findHospital)
router.post('/', authentification, authorization, HospitalCtrl.setHospital);
router.put("/:id", authentification, authorization, HospitalCtrl.editHospital)
router.delete("/:id", authentification, authorization, HospitalCtrl.deleteHospital)


module.exports = router;
