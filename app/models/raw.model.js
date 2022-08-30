module.exports = (sequelize, Sequelize) => {
    const Raw = sequelize.define("raw", {
    blobUUID:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    bookUUID: {
        type:Sequelize.INTEGER
    },      
    file:{
        type:Sequelize.BLOB
    },
    fileType:{
        type:Sequelize.STRING
    }
});

return Raw;
};