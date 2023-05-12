const db = require("../models");
const Slot = db.Slot;
const Hospital = db.Hospital;


// afficher les crénaux
module.exports.getSolt = async (req, res) => {
    // console.log(req)
    if (req.auth.TypeId != 1) {
        const allSlot = await Slot.findAll({ where: { availablity: true } });
        res.status(200).json(allSlot);
    } else {
      const allSlot = await Slot.findAll();
      res.status(200).json(allSlot);
    }
  };
  // afficher un seul créneau
  
  module.exports.findSolt = async (req, res) => {
    if (req.auth.TypeId != 1) {
        const allSlot = await Slot.findAll({ where: { availablity: true } });
        res.status(200).json(allSlot);    } 
        else {
      const oneSlot = await Slot.findByPk(req.params.id);
      res.status(200).json(oneSlot);
    }
  };

// crée un créneau

module.exports.setSolt = async (req, res) => {
  if (req.auth.TypeId != 1) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    const { start, end, hospitalId } = req.body;
    delete req.body.id;
    const createdAt = new Date();
    const updatedAt = new Date();
    if (start < createdAt || end < createdAt || start >= end) {
      res.status(401).json({ message: "erreur sur les dates" });
    } else {
      Hospital.findOne({ where: { id: hospitalId } })
      .then((hospital) => {
        if (!hospital) {
          res.status(404).json({ message: "Hôpital non trouvé" });
        } else {
          const newSlot = new Slot({
            availablity: false,
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
  }
};

// Supprimer un créneau

module.exports.deleteSolt = async (req, res) => {
    if (req.auth.TypeId != 1) {
      res.status(401).json({ message: "Not authorized" });
    } else {
        Slot.findOne({ where: { id: req.params.id } })// vérifier que le solt existe 
        .then((slot)=>{
            if(slot){
                slot.destroy() // supprimer le slot
                res.status(200).json({ message: "créneau supprimé!" })
            }
            else{
                res.status(400).json({ error: "créneau non trouvé " });
            }
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
      
    }
  };


  module.exports.editSolt = async (req, res) => {
    if (req.auth.TypeId != 1) {
      res.status(401).json({ message: "Not authorized" });
    } else {
        Slot.findOne({ where: { id: req.params.id } })// vérifier que le solt existe 
        .then((slot)=>{
            if(slot){
                slot.destroy() // supprimer le slot
                res.status(200).json({ message: "créneau supprimé!" })
            }
            else{
                res.status(400).json({ error: "créneau non trouvé " });
            }
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
      
    }
  };