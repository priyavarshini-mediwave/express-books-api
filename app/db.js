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
    return null;
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
  } else {
    return null;
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

const getBookwithRating = (bookId) => {
  let bookwithId = books.find((b) => b.id == bookId);
  console.log("bookwithId", bookwithId);
  if (!bookwithId) {
    return null;
  }
  const ratingtoFind = ratings.find((r) => r.bookId == bookId);
  console.log("ratingtoFind", ratingtoFind);

  const ratingForBook = ratingtoFind ? ratingtoFind.ratingValue : 0;

  const bookToreturn = {
    id: bookId,
    title: bookwithId.title,
    isbn: bookwithId.isbn,
    rating: ratingForBook,
  };
  return bookToreturn;
};

const EditBookRating = (newRatingValue, bookId) => {
  const editRatingIndex = ratings.findIndex((r) => r.bookId == bookId);
  if (editRatingIndex !== -1) {
    ratings[editRatingIndex].ratingValue = newRatingValue;
    return ratings[editRatingIndex];
  }
  return null;
};

const getBookbyRatingId = (ratingId) => {
  let ratingwithID = ratings.find((r) => r.ratingId == ratingId);
  console.log("ratingwithID", ratingwithID);
  if (!ratingwithID) {
    return null;
  }
  const bookToFind = books.find((b) => b.id == ratingwithID.bookId);
  console.log("bookToFind", bookToFind);

  const booktoReturnByRating = {
    id: ratingwithID.ratingId,
    rating: ratingwithID.ratingValue,
    book: bookToFind,
  };
  console.log("booktoReturnByRating", booktoReturnByRating);
  return booktoReturnByRating;
};

const deleteRating = (id) => {
  console.log("deleteRatingId", id);
  const idx = ratings.findIndex((r) => r.ratingId == id);
  if (idx !== -1) {
    const deletedRating = ratings[idx];
    ratings.splice(idx, 1);
    return deletedRating;
  }
};

const searchBooks = (searchTerm) => {
  const booksToReturn = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return booksToReturn;
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  addRating,
  getBookwithRating,
  EditBookRating,
  getBookbyRatingId,
  deleteRating,
  searchBooks,
};
