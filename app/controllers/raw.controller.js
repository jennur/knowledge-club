const db = require("../models");
const Raw = db.raw;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (raw_file) => {
  return Raw.create(raw_file)
    .then((raw) => {
      console.log(">> Created Raw book:", raw.bookUUID);
      return raw;
    })
    .catch((err) => {
      console.log(">> Error creating Raw book:", err.message);
      return Promise.reject(err);
    });
};


// Find a single Book with an id
exports.findById = (bookId) => {
  return Raw.findOne(bookId, { 
      where: {
        bookUUID:bookId
      }
    })
    .then(raw => raw)
    .catch((err) => {
      console.log(">> Error finding Raw book:", err.message);
      return Promise.reject(err);
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
  Raw.destroy({
    where: {},
    truncate:true
  })
  .then(() => {
    console.log(">> Destroyed Raw book");
  })
  .catch((err) => {
    console.log(">> Error destroying Raw book");
    return Promise.reject(err);
  })
};

// Find all published Books
exports.findAllPublished = () => {
  
};