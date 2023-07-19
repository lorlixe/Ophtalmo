const express = require("express");
const router = express.Router();
const { authentification, authorization } = require("../middleware/auth");

const AppointmentCtrl = require("../controllers/appointement_controller");

router.post("/", authentification, AppointmentCtrl.setAppointment);
router.get("/", authentification, AppointmentCtrl.getAppointment);
router.get("/:id", authentification, AppointmentCtrl.findAppointment);

module.exports = router;
