const dotenv = require("dotenv");
dotenv.config();
const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const { bookSchema } = require("./validations/bookSchema");
const { ratingSchema } = require("./validations/ratingSchema");
const { validate } = require("./validations/inputValidation");
const { getAllBooks, addBook, updateBook, deleteBook } = require("./db");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || [" 500 : An unknown Error occured "],
  });
};

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

app.put("/books/:id", (req, res, next) => {
  let EditBook = {};
  if (req.body.title) {
    EditBook = updateBook({
      id: req.params.id,
      title: req.body.title,
    });
  }

  if (!EditBook) {
    return next({
      code: 400,
      message: "Failed to update movie with id " + req.params.id,
    });
  }
  res.send(EditBook);
});

app.delete("/books/:id", (req, res, next) => {
  const deletedBook = deleteBook(req.params.id);
  if (!deleteBook) {
    return next({
      code: 400,
      message: "Failed to update movie with id " + req.params.id,
    });
  }
  res.send(deletedBook);
});

// post rating
app.post("/books/:id/rating", validate(ratingSchema), (req, res, next) => {});

app.use(errorHandler);
app.listen(config.appPort, () => {
  console.log(`Server running at port ${config.appPort}`);
});
