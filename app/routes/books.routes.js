const express = require("express");
const router = express.Router();
const { getAllBooksController } = require("../controllers/books.controller");

router.get("/", getAllBooksController);

module.exports = router;
