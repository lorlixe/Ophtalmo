const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { authentification, authorization } = require("../middleware/auth");

const HospitalCtrl = require("../controllers/hospital_controller.js");

router.get("/", authentification, authorization(1), HospitalCtrl.getHospital); // adapter avec la nouvelle fonction autorization
router.get(
  "/:id",
  authentification,
  authorization(1),
  HospitalCtrl.findHospital
);
router.post("/", authentification, authorization(1), HospitalCtrl.setHospital);
router.put(
  "/:id",
  authentification,
  authorization(1),
  HospitalCtrl.editHospital
);
router.delete(
  "/:id",
  authentification,
  authorization(1),
  HospitalCtrl.deleteHospital
);

module.exports = router;
