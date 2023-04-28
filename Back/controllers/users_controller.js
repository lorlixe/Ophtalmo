const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/database.js");
const jwt = require("jsonwebtoken");
const app = express();

const User = require("../database/database.js");

exports.signup = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      if (username && hash) {
        try {
          db.promise().query(
            `INSERT INTO USERS (username, password) VALUES('${username}','${hash}')`
          );
          res.status(201).send({ message: "utilisateur créé" });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.status(400).send({ message: "le formulaire n'est pas complet" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    });
};

exports.login = (req, res, next) => {
  let username_connect = req.body.username;
  db.promise()
    .query(`SELECT password, username FROM users WHERE username = ?`, [username_connect])
    .then(([user]) => {
      if (user.length == 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    });
};
