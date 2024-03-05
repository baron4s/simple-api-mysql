const { User, Role } = require('../models')
const jwt = require('jsonwebtoken')

exports.authMiddleware = async (req, res, next) => {
  // const { authorization } = req.headers
  let token
  let decode
  // if (!authorization || !authorization.startsWith('Bearer')) {
  //   return next(
  //     res.status(401).json({
  //       status: 'fail',
  //       message: 'unauthorized',
  //     }),
  //   )
  // }

  token = req.cookies.user
  if (!token) {
    return next(
      res.status(401).json({
        status: 'fail',
        message: 'unauthorized',
      }),
    )
  }

  try {
    decode = jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    return next(
      res.status(401).json({
        status: 'fail',
        message: 'unauthorized',
      }),
    )
  }

  const currentUser = await User.findByPk(decode.id)
  if (!currentUser) {
    next(
      res.status(401).json({
        status: 'fail',
        message: 'unauthorized',
      }),
    )
  }
  req.user = currentUser
  next()
}

exports.permissionUser = (...roles) => {
  return async (req, res, next) => {
    const currentUser = await Role.findByPk(req.user.role_id)
    if (!roles.includes(currentUser.name)) {
      return next(
        res.status(401).json({
          status: 'fail',
          message: 'akses tidak diizinkan',
        }),
      )
    }
    next()
  }
}
