const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

//création de compte
exports.signup = (req, res, next) => {
  const { name, surname, password, email, sexe } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  // vérifié la requête est complète

  if (
    name == null ||
    surname == null ||
    password == null ||
    email == null ||
    sexe == null
  ) {
    return res.status(400).json({ error: "un paramètre n'a pas été complété" });
  }
  // vérifié si l'utilisateur existe
  User.findOne({ where: { email: email } })
    .then(function (userFound) {
      if (!userFound) {
        delete req.body._id;
        delete req.body.TypeId;
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const newUser = User.create({
            name: name,
            surname: surname,
            password: hash,
            email: email,
            sexe: sexe,
            TypeId: 2,
            createdAt: createdAt,
            updatedAt: updatedAt,
          })
            .then(function (newUser) {
              return res.status(201).json({
                userID: newUser.id,
                TypeId: newUser.TypeId,
              });
            })
            .catch((error) => res.status(500).json({ error }));
        });
      } else {
        res.status(403).json({ error: "email déjà utilisé" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion

exports.login = (req, res, next) => {
  let email = req.body.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            TypeId: user.TypeId,
            token: jwt.sign(
              { userId: user.id, TypeId: user.TypeId },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
