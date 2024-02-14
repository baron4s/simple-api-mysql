'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Nama produk sudah ada',
        },
        validate: {
          notNull: {
            msg: 'Nama tidak boleh kosong',
          },
        },
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Harga tidak boleh kosong',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'product',
    },
  )
  return Product
}
