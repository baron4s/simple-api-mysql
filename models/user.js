'use strict'
const bcrypt = require('bcrypt')
const { Model, UUIDV4 } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'nama tidak boleh kosng',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: {
            msg: 'email tidak boleh kosong',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)
          }
          if (!user.role_id) {
            const role = await sequelize.models.Role.findOne({
              where: {
                name: 'user',
              },
            })
            user.role_id = role.id
          }
        },
      },
      sequelize,
      modelName: 'User',
    },
  )
  User.prototype.correctPassword = async (reqPassword, passwordDb) => {
    return await bcrypt.compareSync(reqPassword, passwordDb)
  }
  return User
}
