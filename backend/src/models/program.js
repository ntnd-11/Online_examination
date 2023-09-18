'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Program extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Student, {
                foreignKey: 'programId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Program.init(
        {
            code: {
                type: DataTypes.STRING,
                unique: true,
            },
            name: DataTypes.STRING,
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Program',
        },
    );
    return Program;
};
