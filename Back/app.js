const express = require("express");
const userRoutes = require("./routes/users_routes.js");
const hospitalRoutes = require("./routes/hospital_routes.js");
const slotRoutes = require("./routes/slot_routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/user", userRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/slot", slotRoutes);

module.exports = app;
