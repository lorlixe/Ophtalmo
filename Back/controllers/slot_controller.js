const e = require("express");
const db = require("../models");
const Slot = db.Slot;
const Hospital = db.Hospital;
const User = db.User;

// afficher les crénaux
module.exports.getSolt = (req, res) => {
  // console.log(req)
  User.findOne({ where: { id: req.auth.userId } })
    .then((user) => {
      if (user.TypeId == 1) {
        return Slot.findAll();
      }
      return Slot.findAll({ where: { availablity: true } });
    })
    .then((allSlot) => {
      res.status(200).json(allSlot);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
// afficher un seul créneau

module.exports.findSolt = (req, res) => {
  Slot.findOne({ where: { id: req.params.id } })
    .then((slot) => {
      if (!slot) {
        return res.status(401).json({ error: "Slot non trouvé !" });
      }
      User.findOne({ where: { id: req.auth.userId } }).then((user) => {
        if (user.TypeId == 1) {
          Slot.findOne({ where: { id: req.params.id } }).then((slot) => {
            res.status(200).json(slot);
          });
        } else {
          Slot.findOne({ where: { id: req.params.id } }).then((slot) => {
            if (slot.availablity) {
              res.status(200).json(slot);
            } else {
              res.status(400).json({ error: "créneau indisponible" });
            }
          });
        }
      });
    })

    .catch((error) => {
      res.status(400).json({ error });
    });
};

// crée un créneau

module.exports.setSolt = (req, res) => {
  const { start, end, hospitalId } = req.body;
  delete req.body.id;
  const createdAt = new Date();
  const updatedAt = new Date();
  if (start < createdAt || end < createdAt || start >= end) {
    res.status(401).json({ message: "erreur sur les dates" });
  } else {
    Hospital.findOne({ where: { id: hospitalId } }).then((hospital) => {
      if (!hospital) {
        res.status(404).json({ message: "Hôpital non trouvé" });
      } else {
        const newSlot = new Slot({
          availablity: true,
          start: start,
          end: end,
          hospitalId: hospitalId,
          createdAt: createdAt,
          updatedAt: updatedAt,
        });

        newSlot
          .save()
          .then(() => {
            res.status(201).json({ message: "Créneau crée !" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    });
  }
};

// Supprimer un créneau

module.exports.deleteSolt = (req, res) => {
  Slot.findOne({ where: { id: req.params.id } }) // vérifier que le solt existe
    .then((slot) => {
      if (slot) {
        slot.destroy(); // supprimer le slot
        res.status(200).json({ message: "créneau supprimé!" });
      } else {
        res.status(400).json({ error: "créneau non trouvé " });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// modifier

module.exports.editSolt = async (req, res) => {
  delete req.body.id;
  const slotObjet = req.body;
  const updatedAt = new Date();
  const { start, end, hospitalId } = req.body;
  Slot.findOne({ where: { id: req.params.id } }) // vérifier que le solt existe
    .then((slot) => {
      if (slot) {
        if (start < updatedAt || end < updatedAt || start >= end) {
          res.status(401).json({ message: "erreur sur les dates" });
        } else {
          console.log("start");
          slot
            .update(slotObjet, { updatedAt: updatedAt, new: true })
            .then(() => res.status(200).json({ message: "Hôpital modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        }
      } else {
        res.status(400).json({ error: "créneau non trouvé " });
      }
    });
};
