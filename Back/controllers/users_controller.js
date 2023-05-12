const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

//création de compte
exports.signup = (req, res, next) => {
  const { name, surname, password, email, sexe, TypeId } = req.body;
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
  User.findOne({
    attribute: ["email"],
    where: { email: email },
  })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const newUser = User.create({
            name: name,
            surname: surname,
            password: hash,
            email: email,
            sexe: sexe,
            TypeId: TypeId,
            createdAt: createdAt,
            updatedAt: updatedAt,
          })
            .then(function (newUser) {
              return res.status(201).json({
                userID: newUser.id,
              });
            })
            .catch((error) => res.status(500).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error: "email déjà utilisé" }));
};

// Connexion

exports.login = (req, res, next) => {
  let encryptedEmail = req.body.email;
  User.findOne({ email: encryptedEmail })
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
              { userId: user.id,
                TypeId: user.TypeId },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
