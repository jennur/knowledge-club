module.exports = (sequelize, Sequelize) => {
    const Chapter = sequelize.define("chapter", {
      
        chapterUUID:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        bookUUID: {
            type:Sequelize.INTEGER,
            allowNull:false
        },      
        chapterName: {
            type: Sequelize.STRING,
        },
        chapterNumber:{
            type: Sequelize.STRING
        },
        dateUploaded: {
            type: Sequelize.DATE,
            allowNull:false
        },
        chapterContent:{
            type: Sequelize.TEXT,
        }
    });

    return Chapter;
  };