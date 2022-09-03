const { DataTypes } = require("sequelize");
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
        createdAt: {
            type: Sequelize.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        },
        chapterContent:{
            type: Sequelize.TEXT,
        }
    },
    {timestamps:false});

    return Chapter;
  };