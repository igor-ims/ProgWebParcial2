const express = require("express");
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/error-middleware');
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/api/comments', require('./routes/comment-routes'));

app.use('/api/users', require('./routes/user-routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));

