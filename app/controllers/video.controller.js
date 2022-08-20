const db = require("../models");
const Video = db.videos;
const Op = db.Sequelize.Op;

// Create and Save a new Video
exports.create = (bookId, video) => {
  return Video.create({
      title: video.title,
      description: video.description,
      bookId: bookId
    })
    .then((video) => {
        console.log(">> Created video: " + JSON.stringify(video, null, 4));
        return video;
    })
    .catch((err) => {
        console.log(">> Error while creating video: ", err);
    });
};

// Retrieve all Videos from the database.
exports.findAll = () => {
  return Video.findAll().then(videos => videos);
};

// Find a single Video with an id
exports.findById = (id) => {
  return Video.findByPk(id, { include: ["book"] })
    .then(video => video)
    .catch((err) => {
      console.log(">> Error while finding video: ", err);
    });
};

// Update a Video by the id in the request
exports.update = () => {
  
};

// Delete a Video with the specified id in the request
exports.delete = () => {
  
};

// Delete all Videos from the database.
exports.deleteAll = () => {
  
};

// Find all published Videos
exports.findAllPublished = () => {
  
};