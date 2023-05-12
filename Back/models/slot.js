'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Slot.belongsTo(models.Hospital, {
        foreignKey: {
          allowNull: false,
        },
      }); 
      // define association here
    }
  }
  Slot.init({
    availablity: DataTypes.BOOLEAN,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    hospitalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slot',
  });
  return Slot;
};