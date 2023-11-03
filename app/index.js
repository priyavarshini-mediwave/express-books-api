const dotenv = require("dotenv");
dotenv.config();
const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const { bookSchema } = require("./bookSchema");
const { validate } = require("./inputValidation");
const { getAllBooks, addBook } = require("./db");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/books", (req, res) => {
  res.json(getAllBooks());
});

// app.post("/books", (req, res, next) => {
//   if (req.body.title && req.body.isbn) {
//     const newBook = addBook({
//       title: req.body.title,
//       isbn: req.body.isbn,
//     });
//     console.log(newBook);
//     return res.json(newBook);
//   }
//   return next({
//     code: 400,
//     message: "Books payload should have title and isbn",
//   });
// });
app.post("/books", validate(bookSchema), (req, res) => {
  const book = addBook(req.xop);
  res.send(book);
});

app.listen(config.appPort, () => {
  console.log(`Server running at port ${config.appPort}`);
});
