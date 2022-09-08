module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      articleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      highlightId: {
        type: Sequelize.INTEGER,
        references: { model: 'highlights', key: 'highlightId' },
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Article;
  };