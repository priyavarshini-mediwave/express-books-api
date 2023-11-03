const { isValidISBN } = require("./validations/ISBN validation");
const books = [];

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
module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
