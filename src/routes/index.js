const mainRoutes = require("express").Router();
const booksRoutes = require("./booksRoutes");
const authRoutes = require('./authRoutes');

mainRoutes.use("/books", booksRoutes);
mainRoutes.use('/auth', authRoutes);

module.exports= mainRoutes;