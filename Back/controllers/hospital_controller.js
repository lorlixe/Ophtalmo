const db = require("../models");
const Hospital = db.Hospital;

// afficher les hôpitaux
module.exports.getHospital = async (req, res) => {
  // console.log(req)
  const allHospital = await Hospital.findAll();
  res.status(200).json(allHospital);
};
// afficher un seul hôpital

module.exports.findHospital = async (req, res) => {
  const oneHospital = await Hospital.findByPk(req.params.id);
  res.status(200).json(oneHospital);
  
};

// créer un hôpital

exports.setHospital = (req, res, next) => {
  const { name, adress, PriceListId } = req.body;
  delete req.body._id;
  const createdAt = new Date();
  const updatedAt = new Date();

  const newHospital = new Hospital({
    name: name,
    adress: adress,
    PriceListId: PriceListId,
    createdAt: createdAt,
    updatedAt: updatedAt,
  });

  newHospital
    .save()
    .then(() => {
      res.status(201).json({ message: "Hospital enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// modifier un hôpital

exports.editHospital = (req, res) => {
  const updatedAt = new Date();
  const hospitalObject = req.body;
  delete hospitalObject.userId;

  Hospital.findOne({ where: { id: req.params.id } }) // ou findByPk(req.params.id)
    .then((hospital) => {
      if (!hospital) {
        res.status(404).json({ message: "Hôpital non trouvé" });
      } else {
        hospital
          .update(hospitalObject, { updatedAt: updatedAt, new: true })
          .then(() => res.status(200).json({ message: "Hôpital modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// supprimer un hôpital

module.exports.deleteHospital = (req, res) => {
  Hospital.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Hôpital supprimé!" }))
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
