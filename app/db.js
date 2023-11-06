const { isValidISBN } = require("./validations/ISBN validation");
const { v4: uuidv4 } = require("uuid");

const books = [];
const ratings = [];

const getAllBooks = () => books;

const addBook = ({ title, isbn }) => {
  if (isValidISBN(isbn)) {
    const book = { id: new Date().getTime(), title: title, isbn: isbn };

    books.push(book);
    return book;
  } else {
    console.log("error");
  }
};

const updateBook = ({ id, title }) => {
  console.log("called", id, title);
  const idx = books.findIndex((b) => b.id == id);
  if (idx !== -1) {
    books[idx].title = title;
    return books[idx];
  }
  return null;
};

const deleteBook = (id) => {
  console.log("deleteId", id);
  const idx = books.findIndex((b) => b.id == id);
  if (idx !== -1) {
    const deletedBook = books[idx];
    books.splice(idx, 1);
    return deletedBook;
  }
};

const addRating = (ratingValue, bookId) => {
  let ratingId = uuidv4();
  const rating = {
    ratingId: ratingId,
    ratingValue: ratingValue,
    bookId: bookId,
  };
  ratings.push(rating);
  return rating;
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  addRating,
};
