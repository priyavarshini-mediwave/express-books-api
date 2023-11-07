const dotenv = require("dotenv");
dotenv.config();
const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const { bookSchema } = require("./validations/bookSchema");
const { ratingSchema } = require("./validations/ratingSchema");
const { validate } = require("./validations/inputValidation");
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  addRating,
  getBookwithRating,
  EditBookRating,
  getBookbyRatingId,
  deleteRating,
} = require("./db");

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
app.post("/books", validate(bookSchema), (req, res, next) => {
  const book = addBook(req.xop);
  if (!book) {
    return next({
      status: 400,
      message: "Failed to add book with title  " + req.xop.title,
    });
  }
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
      status: 400,
      message: "Failed to update book with id " + req.params.id,
    });
  }
  res.send(EditBook);
});

app.delete("/books/:id", (req, res, next) => {
  const deletedBook = deleteBook(req.params.id);
  console.log(deletedBook);
  if (!deletedBook) {
    return next({
      status: 400,
      message: "Failed to delete book with id " + req.params.id,
    });
  }
  res.send(deletedBook);
});

// post rating
app.post("/books/:id/rating", validate(ratingSchema), (req, res, next) => {
  console.log(req.xop.ratingValue);
  const rating = addRating(req.xop.ratingValue, req.params.id);
  res.send(rating);
  if (!rating) {
    return next({
      status: 400,
      message: "Failed to add rating to the book with id " + req.params.id,
    });
  }
});

//get book by id with rating
app.get("/books/:id", (req, res) => {
  const bookWithRating = getBookwithRating(req.params.id);
  res.send(bookWithRating);
});

app.put("/books/:id/rating", validate(ratingSchema), (req, res, next) => {
  let ratingEditedBook = EditBookRating(req.xop.ratingValue, req.params.id);
  if (!ratingEditedBook) {
    return next({
      status: 400,
      message: "Failed to update rating for book with id " + req.params.id,
    });
  }
  res.send(ratingEditedBook);
});

app.get("/rating/:ratingId", (req, res, next) => {
  const bookbyRatingId = getBookbyRatingId(req.params.ratingId);
  if (!bookbyRatingId) {
    return next({
      status: 400,
      message:
        "Failed to get book for rating with Ratingid " + req.params.ratingId,
    });
  }
  res.send(bookbyRatingId);
});

app.delete("/rating/:ratingId", (req, res, next) => {
  const deletedRating = deleteRating(req.params.ratingId);
  if (!deletedRating) {
    return next({
      status: 400,
      message: "Failed to delete rating with id " + req.params.ratingId,
    });
  }
  res.send(deletedRating);
});
app.use(errorHandler);
app.listen(config.appPort, () => {
  console.log(`Server running at port ${config.appPort}`);
});
