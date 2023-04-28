const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const db = require("../database/database.js");


const User = require("../database/database.js");

exports.signup = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      db.promise().query(`INSERT INTO USERS VALUES('${username}','${password}')`);
      res.status(201).send({ message: "created User" });
    } 
    catch (err) {
      console.log(err);
    }
  }
};

exports.login = (req, res, next) => {


};
