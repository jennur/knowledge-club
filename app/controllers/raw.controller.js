const db = require("../models");
const Raw = db.raw;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (raw_file) => {
  return Raw.create(raw_file)
    .then((raw) => {
      console.log(">> Created raw book: " + title);
      return raw;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err);
    });
};


// Find a single Book with an id
exports.findById = (bookId) => {
  return Raw.findOne(bookId, { where:{
    bookUUID:bookId
  }})
    .then((raw) => {
        return raw;
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
  Raw.destroy({where:{},
  truncate:true}).then(()=>{
    console.log("destroyed raw")
  })
};

// Find all published Books
exports.findAllPublished = () => {
  
};