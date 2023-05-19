const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

function authentification(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const TypeId = decodedToken.TypeId;
    req.auth = {
      userId: userId,
    };
    // faire une reqete pour vérifier que le userID existe
    // faire un findOne pour récupérer le TypeId dans le controller

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}

function authorization(req, res, next) {
    User.findOne({ where: { id: req.auth.userId },})
    .then((user) => {
        if (user.TypeId !== 1) {
            res.status(401).json({ message: "Not authorized" });
          } 

    })
    .catch((error) => res.status(500).json({ error }));

  next();

}

module.exports = {
  authentification,
  authorization
};
