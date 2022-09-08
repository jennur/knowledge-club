
module.exports = (sequelize, Sequelize) => {
    const Chapter = sequelize.define("chapter", {
        chapterUUID:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        chapterName: {
            type: Sequelize.STRING,
        },
        chapterNumber:{
            type: Sequelize.STRING
        },
        chapterContent:{
            type: Sequelize.TEXT,
        }
    });

    return Chapter;
  };