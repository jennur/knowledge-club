const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;
const btoa = require("btoa");
const querystring = require("querystring");

// Create and Save a new Book
exports.create = (book) => {
  return Book.create(book)
    .then((book) => {
      console.log(">> Created book: " + book.title);
      return book;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err.message);
      return err;
    });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const { order, limit } = req.query;
  const query = {
    order: order && JSON.parse(order),
    limit: limit && parseInt(limit)
  }
  return Book.findAll(query)
    .then((books) => {
      return books
    })
    .catch((err) => {
      console.log(">> Error while finding books: ", err.message);
      return err;
    })
};

// Find a single Book with an id
exports.findById = (bookId) => {
  return Book.findByPk(bookId)
    .then((book) => {
      return book;
    })
    .catch((err) => {
      console.log(">> Error while finding book: ", err.message);
      return err;
    });
};

// Update a Book by the id in the request
exports.update = () => {
  
};

// Delete a Book with the specified id in the request
exports.delete = () => {
};

// Delete all Books from the database.
exports.deleteAll = () => {
  Book.destroy({
    where: {},
    truncate: true
  })
  .then((book)=>{
    console.log("destroyed book" + book.title)
  })
  .catch((err) => {
    console.log(">> Error while destroying books: ", err.message);
    return err;
  })
};

// Get cover image
exports.getCoverImage = (bookId) => {
  return Book.findByPk(bookId)
    .then((book) => {
      if(book.coverImage){
        let imgData = bufferToBase64(book.coverImage);
        return `data:image/jpeg;base64,${imgData}`;
      }
    
      function bufferToBase64(buffer) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      return `${process.env.VITE_BASE_URL}/placeholder.jpg`;
    })
    .catch((err) => {
      console.log(">> No cover image found: ", err.message);
      return err;
    });
};