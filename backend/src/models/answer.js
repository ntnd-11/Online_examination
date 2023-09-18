'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsTo(models.Question);
        }
    }
    Answer.init(
        {
            description: DataTypes.STRING,
            isCorrect: DataTypes.BOOLEAN,
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Answer',
        },
    );
    return Answer;
};
