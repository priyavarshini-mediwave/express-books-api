const { isValidISBN } = require("./ISBN validation");
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

module.exports = {
  getAllBooks,
  addBook,
};
