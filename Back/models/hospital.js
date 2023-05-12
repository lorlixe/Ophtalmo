'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Hospital.belongsTo(models.PriceList, {
        foreignKey: {
          allowNull: false,
        },
      })
      models.Hospital.hasMany(models.Slot)
      // define association here
    }
  }
  Hospital.init({
    name: DataTypes.STRING,
    adress: DataTypes.STRING,
    PriceListId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hospital',
  });
  return Hospital;
};