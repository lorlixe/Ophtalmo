const express = require('express');
const userRoutes = require('./routes/users_routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes);
module.exports = app;


