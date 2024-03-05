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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      description: DataTypes.STRING,
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Harga tidak boleh kosong',
          },
        },
      },
      stock: DataTypes.INTEGER,
      image: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'gambar tidak boleh kosong',
          },
        },
      },
      category_id: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'kategori tidak boleh kosong',
          },
          isInt: true,
          isExists(value) {
            return sequelize.models.Category.findByPk(value).then((el) => {
              if (!el) {
                throw new Error('kategori tidak ditemukan')
              }
            })
          },
        },
      },
      countReview: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  )
  return Product
}
