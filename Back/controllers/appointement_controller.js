const express = require("express");
const db = require("../models");
const Slot = db.Slot;
const User = db.User;
const Appointment = db.Appointment;

// réserver un rdv
module.exports.setAppointment = (req, res) => {
  const { SlotId } = req.body;
  delete req.body.id;
  const createdAt = new Date();
  const updatedAt = new Date();
  const UserId = req.auth.userId;

  Appointment.findOne({ where: { SlotId: SlotId } }).then(function (slotFound) {
    if (slotFound) {
      res.status(403).json({ error: "créneau est déjà pris" });
    } else {
      Slot.findOne({ where: { id: SlotId } })
        .then((slot) => {
          if (!slot.availablity) {
            res.status(403).json({ message: "créneau non disponible" });
          } else {
            User.findOne({ where: { id: UserId } }).then((user) => {
              const newAppointment = new Appointment({
                State: "Réservé",
                SlotId: slot.id,
                UserId: UserId,
                createdAt: createdAt,
                updatedAt: updatedAt,
              });
              slot.update({ availablity: false, updatedAt: updatedAt });
              newAppointment
                .save()
                .then(() => {
                  res.status(201).json({
                    message: "Créneau réservé !",
                    State: "Réservé",
                    UserId: user.id,
                    Name: user.name,
                    Surnmar: user.surname,
                    SlotId: newAppointment.SlotId,
                    HopistalID: slot.hospitalId,
                  });
                })
                .catch((error) => {
                  res.status(400).json({ error });
                });
            });
          }
        })
        .catch((error) =>
          res.status(404).json({ message: "Ce crénéau n'existe pas" })
        );
    }
  });
};

// afficher les rdv
module.exports.getAppointment = (req, res) => {
  User.findOne({ where: { id: req.auth.userId } })
    .then((user) => {
      if (user.TypeId == 1) {
        return Appointment.findAll();
      }
      return Appointment.findAll({ where: { UserId: req.auth.userId } });
    })
    .then((allAppointment) => {
      res.status(200).json(allAppointment);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// afficher un rdv
module.exports.findAppointment = (req, res) => {
  Appointment.findOne({ where: { id: req.params.id } })
    .then((appointment) => {
      if (!appointment) {
        return res.status(401).json({ error: "RDV non trouvé !" });
      }
      User.findOne({ where: { id: req.auth.userId } }).then((user) => {
        if (user.TypeId == 1) {
          Appointment.findOne({ where: { id: req.params.id } }).then(
            (appointment) => {
              res.status(200).json(appointment);
            }
          );
        } else {
          Appointment.findOne({ where: { id: req.params.id } }).then(
            (appointment) => {
              if ((appointment.UserId = req.auth.userId)) {
                res.status(200).json(appointment);
              } else {
                res.status(400).json({ error: "créneau indisponible" });
              }
            }
          );
        }
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
