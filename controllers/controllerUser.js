const { User } = require('../models')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/asyncHandler')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXP_JWT,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id)
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.COOKIE_JWT_EXPIRES * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }
  res.cookie('user', token, cookieOption)
  user.password = undefined
  res.status(statusCode).json({
    status: 'success',
    message: 'berhasil login',
    data: user,
  })
}

exports.register = async (req, res) => {
  try {
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'fail',
        message: 'password dan passwordConfirm tidak sama',
      })
    }

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    res.status(201).json({
      status: 'ok',
      message: 'user create',
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'something wrong',
    })
  }
}

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'email atau password kosong',
      })
    }

    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    const checkPassword = await userData.correctPassword(
      req.body.password,
      userData.password,
    )

    if (!userData || !checkPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'invalid email atau password',
      })
    }

    createSendToken(userData, 201, res)
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'something wrong',
    })
  }
}

exports.logoutUser = async (req, res) => {
  res.clearCookie('user', { httpOnly: true, expires: new Date(0) })
  res.status(200).json({
    status: 'success',
    message: 'berhasil logout',
  })
}

exports.getMyUser = async (req, res) => {
  const myUser = await User.findByPk(req.user.id)
  if (!myUser) {
    return res.status(404).json({
      status: 'fail',
      message: 'data tidak ditemukan',
    })
  }

  res.status(200).json({
    status: 'success',
    message: 'ok',
    data: {
      id: myUser.id,
      name: myUser.name,
      email: myUser.email,
      role_id: myUser.role_id,
    },
  })
}
