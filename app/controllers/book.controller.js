const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (book) => {
  return Book.create(book)
    .then((book) => {
      console.log(">> Created book: " + book.title);
      return book;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err);
    });
};

// Retrieve all Books from the database.
exports.findAll = (req,res) => {
  return Book.findAll({
    include: ["videos", "articles"]
  }).then((books) => {
    return res.send(books)
  });
};

// Find a single Book with an id
exports.findById = (bookId) => {
  return Book.findByPk(bookId, { include: ["videos", "articles"]})
    .then((book) => {
        return book;
    })
    .catch((err) => {
        console.log(">> Error while finding book: ", err);
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
  Book.destroy({where:{},
  truncate:true}).then((book)=>{
    console.log("destroyed book" + book.title)
  })
};

// Find all published Books
exports.findAllPublished = () => {
  
};